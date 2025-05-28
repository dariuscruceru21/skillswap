import { Check, Quote } from "lucide-react";

export default function LeftPanel() {
  return (
    <div className="mb-12 lg:mb-0 hidden lg:block h-full">
      <div className="gradient-bg rounded-2xl p-8 text-white h-full flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">
          Join Our Community of Skill Swappers
        </h2>
        <div className="space-y-6 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-20 flex items-center justify-center mr-4">
              <Check className="text-indigo-100" size={24}/>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Trade Skills, Not Money</h3>
              <p className="text-indigo-100">
                Exchange your expertise with others in your community without
                cash transactions.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-20 flex items-center justify-center mr-4">
             <Check className="text-indigo-100" size={24}/>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Learn New Skills</h3>
              <p className="text-indigo-100">
                Gain knowledge in areas you're passionate about by trading what
                you already know.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-400 bg-opacity-20 flex items-center justify-center mr-4">
             <Check className="text-indigo-100" size={24}/>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Build Connections</h3>
              <p className="text-indigo-100">
                Meet like-minded people in your area who share your interests.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-indigo-500 bg-opacity-20 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-400 bg-opacity-30 flex items-center justify-center mr-4">
              <Quote className="text-indigo-100" size={32}/>
            </div>
            <div>
              <p className="italic mb-2 text-indigo-100">
                "I've learned photography, Spanish, and woodworking all by
                trading my web development skills. Best decision ever!"
              </p>
              <p className="font-medium text-indigo-100">- Sarah J., SkillSwap Member</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
