import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from 'axios';



const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    riskTolerance: '', // 🆕 Add risk tolerance field
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
  
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', formData.email);
          navigate('/dashboard');
        }
      } else {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          riskTolerance: formData.riskTolerance,
        });
  
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', formData.username);
          localStorage.setItem('riskTolerance', formData.riskTolerance);
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 bg-gray-900 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? "Login to Your Account" : "Create an Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="bg-gray-800 text-white border-gray-700"
              required
            />
          )}

          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-800 text-white border-gray-700"
            required
          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-800 text-white border-gray-700"
            required
          />

          {/* 🆕 Risk Tolerance Dropdown */}
          {!isLogin && (
            <div>
              <label className="text-sm text-white mb-1 block">What is your risk tolerance?</label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, riskTolerance: value })}
              >
                <SelectTrigger className="bg-gray-800 text-white border-gray-700">
                  <SelectValue placeholder="Select risk tolerance" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-white">
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <Button className="w-full bg-[#00D395] hover:bg-[#00D395]/90" type="submit">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <p className="text-gray-400 text-sm text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-[#00D395] hover:underline cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </Card>
    </div>
  );
};

export default RegisterPage;