import Donation from "../models/donation.model.js";
import { stripe } from "../lib/stripe.js";
export const createDonationSession = async (req, res) => {
  try {
    const { amount, message } = req.body;

    // Create a pending donation
    const donation = await Donation.create({
      donor: req.user._id,
      amount,
      message,
      status: "pending",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation",
              description: message || "Thank you for your support!",
            },
            unit_amount: Math.round(amount * 100), // Stripe works in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/donation-cancelled`,
      metadata: {
        donationId: donation._id.toString(),
        userId: req.user._id.toString(),
      },
    });

    // Save session ID to donation
    donation.stripeSessionId = session.id;
    await donation.save();

    res.json({ sessionUrl: session.url, totalAmount: amount });
  } catch (error) {
    console.error("Error creating donation session:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const donationId = session.metadata.donationId;

    await Donation.findByIdAndUpdate(donationId, { status: "completed" });
  }

  res.status(200).json({ received: true });
};

