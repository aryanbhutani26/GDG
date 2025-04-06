// export default Learning;
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { courses } from '../data/courses';
import { useNavigate } from 'react-router-dom';

const Learning: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/dashboard/learning/course/${courseId}`);
  };
  
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Learning Center</h1>
          <Button 
            variant="outline" 
            className="border-[#00D395] text-[#00D395] hover:bg-[#00D395] hover:text-white cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card 
              key={course.id} 
              className="p-6 bg-gray-900/50 border-gray-800 hover:border-[#00D395] transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="text-4xl mb-2">{course.image}</div>
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-[#00D395]">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="bg-gray-800 [&>div]:bg-[#00D395]" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    <i className="far fa-clock mr-2"></i>
                    {course.duration}
                  </span>
                  <Button 
                    className="bg-[#00D395] hover:bg-[#00D395]/90 cursor-pointer"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    {course.progress > 0 ? 'Continue' : 'Start'} Course
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button 
            variant="outline" 
            className="border-[#00D395] text-[#00D395] hover:bg-[#00D395] hover:text-white px-8 py-6 text-lg"
          >
            Browse All Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Learning;