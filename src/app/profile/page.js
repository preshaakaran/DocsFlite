import { getDocuments } from '@/actions';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { currentUser } from '@clerk/nextjs/server';
import { get } from 'mongoose';
import Link from 'next/link';
import React from 'react';

async function Profile(){
    const user = await currentUser();
    console.log(user)
    const doc = await getDocuments(user.id);
    const total = doc.length;
    
      return (
        <div className='pr-3 pl-3'>
        <Header user={user}/>
        <div className="max-w-3xl mx-auto p-6 bg-white h-[85vh]">
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.imageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800">{user?.firstName}{" "}{user?.lastName}</h2>
            <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
    
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Document Status</h3>
            <ul className="list-none list-inside mt-2 text-gray-600">
              <li>Total Documents: {total}</li>

            </ul>
          </div>
    
          <div className="flex justify-between">
            <button className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mr-2">
              <Link href="/dashboard">Upload Document</Link>
            </button>
            <button className="w-1/2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ml-2">
              <Link href="/dashboard">Manage Documents</Link>
            </button>
          </div>
        </div>
        <Footer />
        </div>
      );

}

export default Profile;
