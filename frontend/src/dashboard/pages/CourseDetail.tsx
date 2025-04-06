import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses } from '../data/courses';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <div>Course not found</div>;
  }

  const handleVideoClick = (videoUrl: string) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <Button 
            variant="outline" 
            className="border-[#00D395] text-[#00D395] hover:bg-[#00D395] hover:text-white"
            onClick={() => navigate('/dashboard/learning')}
          >
            Back to Courses
          </Button>
        </div>
        
        {/* Updated Video Player Section */}
        <Card className="w-full p-6 bg-gray-900/50 border-gray-800">
          <div 
            className="aspect-video w-full bg-gray-800 rounded-lg mb-4 overflow-hidden flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleVideoClick(course.chapters[selectedChapter].videoUrl)}
          >
            <div className="text-center">
              <i className="fas fa-play-circle text-6xl text-[#00D395] mb-4"></i>
              <p className="text-white">Click to watch video in new tab</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-white">
              {course.chapters[selectedChapter].title}
            </h3>
            <p className="text-gray-400">
              <i className="far fa-clock mr-2"></i>
              {course.chapters[selectedChapter].duration}
            </p>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Overview */}
          <Card className="lg:col-span-1 p-6 bg-gray-900/50 border-gray-800">
            <div className="space-y-6">
              <div className="text-6xl mb-4">{course.image}</div>
              <div>
                <h2 className="text-xl font-semibold mb-2 text-white">About this course</h2>
                <p className="text-gray-400">{course.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-[#00D395]">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="bg-gray-800 [&>div]:bg-[#00D395]" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Level</p>
                  <p className="text-white">{course.level}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Duration</p>
                  <p className="text-white">{course.duration}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Chapters List */}
          <Card className="lg:col-span-2 p-6 bg-gray-900/50 border-gray-800">
            <h2 className="text-xl font-semibold mb-6 text-white">Course Content</h2>
            <div className="space-y-4">
              {course.chapters.map((chapter, index) => (
                <div 
                  key={chapter.id}
                  className={`p-4 rounded-lg transition-colors cursor-pointer ${
                    selectedChapter === index 
                      ? 'bg-[#00D395]/20 border border-[#00D395]/50' 
                      : 'bg-gray-800/50 hover:bg-gray-800'
                  }`}
                  onClick={() => setSelectedChapter(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        chapter.completed ? 'bg-[#00D395]' : 
                        selectedChapter === index ? 'bg-[#00D395]/50' : 'bg-gray-700'
                      }`}>
                        {chapter.completed ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{chapter.title}</h3>
                        <p className="text-sm text-gray-400">
                          <i className="far fa-clock mr-2"></i>
                          {chapter.duration}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      className={`${
                        selectedChapter === index 
                          ? 'text-white bg-[#00D395] hover:bg-[#00D395]/90' 
                          : 'text-[#00D395] hover:text-[#00D395]/90 hover:bg-[#00D395]/10'
                      }`}
                    >
                      {selectedChapter === index ? 'Playing' : chapter.completed ? 'Review' : 'Start'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;