
import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import React from 'react';

async function About(){
    const user = await currentUser();
  return (
    <div className='pr-3 pl-3'>
    <Header user={user}/>
    <div className="w-full mx-auto p-6 h-[85vh] bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to DocsFilte, your ultimate solution for efficient document management. We are dedicated to helping businesses streamline their document workflows, enhance collaboration, and improve productivity.
      </p>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Our Mission</h2>
      <p className="text-lg text-gray-700 mb-4">
        Our mission is to simplify document management by providing a user-friendly platform that allows you to organize, share, and secure your documents with ease. We believe that efficient document handling is the backbone of a successful organization.
      </p>
      <h2 className="text-2xl font-semibold mt-4 mb-2">What We Offer</h2>
      <ul className="list-disc list-inside text-lg text-gray-700 mb-4">
        <li>Intuitive document organization and retrieval</li>
        <li>Secure cloud storage solutions</li>
        <li>Collaborative tools for team projects</li>
        <li>Advanced search capabilities</li>
        <li>Customizable access permissions</li>
      </ul>


    </div>
    <Footer />
    </div>
  );
};

export default About;
