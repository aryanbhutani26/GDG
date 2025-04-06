import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Remove unused imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import '@fortawesome/fontawesome-free/css/all.min.css';
import { features, testimonials } from '../data';
import AiDemo from '@/components/AiDemo';

import { scrollToSection } from '@/utils/scroll';


const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setEmail('');
    }
  };

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Mobile Menu */}
      <div className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-50 transform transition-transform duration-300 ease-in-out" 
           style={{ transform: showMobileMenu ? 'translateX(0)' : 'translateX(100%)' }}>
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          <a href="#features" onClick={() => setShowMobileMenu(false)} className="text-2xl hover:text-[#00D395] transition-colors">Features</a>
          <a href="#demo" onClick={() => setShowMobileMenu(false)} className="text-2xl hover:text-[#00D395] transition-colors">Demo</a>
          <a href="#join" onClick={() => setShowMobileMenu(false)} className="text-2xl hover:text-[#00D395] transition-colors">Join</a>
          <Button className="!rounded-button text-xl px-8" style={{backgroundColor: '#00D395'}} onClick={handleGetStarted}>
            Get Started
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#121212]/90 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold text-[#00D395]">WealthGenie</div>
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            <a onClick={() => scrollToSection('features')} 
               className="cursor-pointer hover:text-[#00D395] transition-colors">
              Features
            </a>
            <a onClick={() => scrollToSection('demo')} 
               className="cursor-pointer hover:text-[#00D395] transition-colors">
              Demo
            </a>
            <a onClick={() => scrollToSection('join')} 
               className="cursor-pointer hover:text-[#00D395] transition-colors">
              Join
            </a>
            <Button className="!rounded-button whitespace-nowrap cursor-pointer" 
                    style={{backgroundColor: '#00D395'}}
                    onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
          <Button 
            className="md:hidden !rounded-button" 
            style={{backgroundColor: '#00D395'}}
            onClick={() => setShowMobileMenu(true)}
          >
            <i className="fas fa-bars"></i>
          </Button>
        </div>
      </nav>

      {/* Update mobile menu links as well */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="flex flex-col items-center gap-8 text-xl">
            <a onClick={() => {
                setShowMobileMenu(false);
                scrollToSection('features');
              }} 
              className="cursor-pointer hover:text-[#00D395] transition-colors">
              Features
            </a>
            <a onClick={() => {
                setShowMobileMenu(false);
                scrollToSection('demo');
              }} 
              className="cursor-pointer hover:text-[#00D395] transition-colors">
              Demo
            </a>
            <a onClick={() => {
                setShowMobileMenu(false);
                scrollToSection('join');
              }} 
              className="cursor-pointer hover:text-[#00D395] transition-colors">
              Join
            </a>
            <Button className="!rounded-button whitespace-nowrap cursor-pointer" 
                    style={{backgroundColor: '#00D395'}}
                    onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" 
               style={{
                 backgroundImage: `url('https://public.readdy.ai/ai/img_res/553dd5089676cfccdb2a1e8dafac71f3.jpg')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-2xl relative z-10 bg-black/30 p-10 rounded-2xl backdrop-blur-sm">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">Master Your Money with AI-Powered Insights</h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8">
              Transform your financial future with WealthGenie's intelligent platform. Get personalized advice, track your progress, and learn from a community of successful investors.
            </p>
            <Button className="!rounded-button whitespace-nowrap cursor-pointer text-lg px-8 py-6" 
                    style={{backgroundColor: '#00D395'}}
                    onClick={handleGetStarted}>
              Start Your Financial Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 lg:mb-16">Smart Features for Smarter Finance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} 
                className="p-8 bg-gray-900/50 border-gray-800 hover:border-[#00D395] hover:scale-105 hover:shadow-lg hover:shadow-[#00D395]/10 transition-all duration-300 cursor-pointer text-white"
              >
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      {/* <section id="demo" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Experience AI-Powered Financial Guidance</h2>
          <div className="max-w-2xl mx-auto bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-[#00D395] transition-all duration-300 shadow-lg hover:shadow-[#00D395]/20">
            <ScrollArea className="h-[400px] rounded-md">
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4 ml-12">
                  <p>How can I start investing with $1000?</p>
                </div>
                <div className="bg-[#00D395]/10 rounded-lg p-4 mr-12">
                  <p>Here's a smart strategy for your $1000 investment:</p>
                  <ul className="list-disc ml-4 mt-2 space-y-2">
                    <li>Start with a diversified ETF ($500)</li>
                    <li>Allocate to high-yield savings ($300)</li>
                    <li>Explore fractional shares ($200)</li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
            <div className="mt-6">
              <Input
                placeholder="Ask your financial question..."
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>
        </div>
      </section> */}
      <section id="demo" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Experience AI-Powered Financial Guidance</h2>
            <p className="text-gray-400">Try our AI advisor demo and see how we can help you make better financial decisions</p>
          </div>
          <AiDemo />
        </div>
      </section>

      {/* Q&A Section */}
<section id="discussion" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#1c1c1c]">
  <div className="max-w-[1440px] mx-auto">
    <h2 className="text-3xl font-bold text-white text-center mb-10">Community Q&A</h2>
    <div className="space-y-6">
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <p className="font-semibold text-white">Q: What's a good beginner investment?</p>
        <p className="text-gray-400 mt-2">A: Start with ETFs and SIPs – they offer diversification and low risk.</p>
      </div>
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <p className="font-semibold text-white">Q: How do I build an emergency fund?</p>
        <p className="text-gray-400 mt-2">A: Save 3–6 months of expenses in a high-interest savings account.</p>
      </div>
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <p className="font-semibold text-white">Q: Is it safe to invest in mutual funds?</p>
        <p className="text-gray-400 mt-2">A: Yes, if you choose reputed funds and have long-term goals.</p>
      </div>
    </div>

    <div className="mt-10">
      <h3 className="text-xl font-semibold text-white mb-4">Ask a Question</h3>
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Type your financial question..."
          className="bg-gray-800 border-gray-700 text-white flex-grow"
        />
        <Button className="!rounded-button bg-[#00D395]">Submit</Button>
      </div>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-4xl font-bold mb-16">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bg-gray-900/50 border-gray-800 hover:border-[#00D395] hover:scale-105 transition-all duration-300">
                <div className="text-4xl mb-4">{testimonial.image}</div>
                <p className="text-gray-400 mb-6">"{testimonial.text}"</p>
                <h4 className="font-bold text-[#00D395]">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Replace the old demo section with new AiDemo */}
      {/* <section id="demo" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Experience AI-Powered Financial Guidance</h2>
            <p className="text-gray-400">Try our AI advisor demo and see how we can help you make better financial decisions</p>
          </div>
          <AiDemo />
        </div>
      </section> */}

      {/* Join Section */}
      <section id="join" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Join the Financial Revolution</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Be among the first to experience the future of personal finance management.
          </p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit" className="!rounded-button whitespace-nowrap cursor-pointer" style={{backgroundColor: '#00D395'}}>
                Join Waitlist
              </Button>
            </div>
            {showSuccess && (
              <p className="text-[#00D395] mt-4">Thank you for joining! We'll be in touch soon.</p>
            )}
          </form>
          <div className="mt-12 flex justify-center gap-8">
            <i className="fab fa-twitter text-2xl cursor-pointer hover:text-[#00D395] transition-colors"></i>
            <i className="fab fa-linkedin text-2xl cursor-pointer hover:text-[#00D395] transition-colors"></i>
            <i className="fab fa-discord text-2xl cursor-pointer hover:text-[#00D395] transition-colors"></i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;