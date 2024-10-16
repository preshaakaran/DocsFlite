import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Fragment } from "react";

export default async function Home() {
  const user = await currentUser();
  return (
    <div className="pr-3 pl-3 bg-white">
      <Header user={user} />
      <div>
      <div
        className=" relative h-[85vh] w-full bg-cover bg-center opacity-60 "
        style={{
          backgroundImage: "url('/unsplash.jpg')"

        }}
      >
        
      </div>
      <div className="absolute top-10 left-0  w-full">
          <Fragment>
            <section className="relative w-full h-[70vh] pb-10">
              <div className="w-full h-full relative">
                <div className="flex flex-col-reverse lg:flex-row gap-10 mt-16">
                  <section className="w-full lg:w-[50%] flex flex-col md:px-2 lg:px-0 p-5 lg:p-10">
                    <div className="w-full flex justify-start flex-col h-auto lg:pt-7">
                      <span className="flex space-x-2">
                        <span className="block w-14 mb-2 dark:border-white border-b-2 border-gray-700"></span>
                        <span className=" dark:text-white text-gray-800 text-xl font-bold">
                          One Stop Solution to Find Jobs
                        </span>
                      </span>
                      <h1 className="text-3xl dark:text-white mt-5 lg:text-7xl text-black pl-10 font-extrabold">
                        Build your best job community starting from here.
                      </h1>
                      <div className="text-3xl pl-10 mt-5 ml-2">
                        <Button className="text-xl"><Link href='/dashboard'>Get Started</Link></Button>
                      </div>
                    </div>
                  </section>
                  <section className="relative w-full lg:w-[50%] flex items-center justify-end">
                  <img
                src="/girls.png"
                alt="Hero"
                className="h-[75vh] w-full object-contain z-10"
              />
                    
                  </section>
                </div>
              </div>
            </section>
          </Fragment>
        </div>
      </div>
        <Footer />
    </div>
  );
}
