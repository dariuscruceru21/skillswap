import { Check,Quote } from "lucide-react";

export default function LoginLeftPanel() {
  return (
    <div className="mb-12 lg:mb-0 hidden lg:block">
      <div className="gradient-bg rounded-2xl p-8 text-white h-full">
        <h2 className="text-3xl font-bold mb-6">Welcome Back to SkillSwap</h2>
        <div className="space-y-6 mb-8">
          {[
            {
              title: "Continue Your Skill Journey",
              desc: "Pick up where you left off with your skill exchanges."
            },
            {
              title: "New Opportunities",
              desc: "Discover new skills available in your community since your last visit."
            },
            {
              title: "Connect With Members",
              desc: "Check your messages and continue conversations with fellow swappers."
            }
          ].map((item, i) => (
            <div className="flex items-start" key={i}>
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-20 flex items-center justify-center mr-4">
                <Check className=" text-indigo-100 "size={24}/>
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                <p className="text-indigo-100">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-indigo-500 bg-opacity-20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-400 bg-opacity-30 flex items-center justify-center mr-4">
              <Quote className=" text-indigo-100"size={32}/>
            </div>
            <div>
              <p className="italic mb-2">
                "I logged in yesterday and found three new people interested in my coding lessons in exchange for guitar lessons. This platform keeps getting better!"
              </p>
              <p className="font-medium">- Mark T., SkillSwap Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
