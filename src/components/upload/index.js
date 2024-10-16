'use client'
import Footer from "@/components/footer";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import DialogBox from "../dialog";
import { deleteDocument, getDocuments } from "@/actions";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";


const SupabaseClient = createClient('https://your-supabase-url.supabase.co','your-anon-key');


export default function Upload({ user }) {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [ui, setUi] = useState(false);
 

  function handleDoc() {
    setOpenDialog(true);
    console.log(openDialog);
  }

  async function UserDocument() {
    const docs = await getDocuments(user.id);
    setCurrentDoc(docs);
  }  

  useEffect(() => {
    UserDocument();
  }, [user.id,openDialog]);


  async function handleDelete(doc) {
    try {
      const { error } = await SupabaseClient.storage
        .from('docs-board-public')
        .remove([doc.document]);
      await deleteDocument(doc._id);
      UserDocument();
      if(error){
        console.error("Error deleting document:", error);
        toast.error("Error deleting document");
      }
      
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Error deleting document");
      
    }
    toast.success("Document deleted successfully");
    
  }

  async function handleSearch() {
    const results = currentDoc.filter((doc) => 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log(results);
    setSearchResults(results);
    setUi(true);
  }


 

  async function handleDownload(doc) {
    setLoading(true);
    try{
      const { data } = SupabaseClient.storage
        .from("docs-board-public")
        .getPublicUrl(doc.document);
  
      const a = document.createElement("a");
      a.href = data?.publicUrl;
      a.setAttribute("download", `${doc.title}.${doc.fileType}`);
      a.setAttribute("target", "_blank");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }catch(error){
      console.error("Error downloading file:", error);
    }finally{
      setLoading(false);
    }
    
  }


  return (
    <div className="pr-3 pl-3">
      <Header user={user} />
      <div className="bg-white h-[82vh] ">
        <div className="p-3 mt-5 gap-5 flex">
          <Button onClick={handleDoc}>Upload Document</Button>
          <Button onClick={()=>setUi(false)}>View Documents</Button>


          <div className="flex">
            <Input className="bg-gray-200 border border-gray-300 focus:border-white rounded-none focus:outline-none focus-visible:border-white focus-visible:outline-none" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>

            <Button onClick={handleSearch}>Search</Button>

            <div>
              

            </div>
          </div>
        </div>
        <div className="h-[66vh] p-5 m-2 bg-gray-200 rounded-xl overflow-y-auto scrollbar-hide">
        {
          ui?<div>
            {
              user && searchResults != null ? (
                searchResults.map((doc) => {
                 
                  let fileType = doc.fileType;
      
                
                  if (fileType.endsWith('x')) {
                    fileType = fileType.slice(0, -1);
                  }
      
                 
                  if (fileType === "jpeg") {
                    fileType = "jpg";
                  }
      
                  return (
                    <div className="p-2 pb-5" key={doc._id}>
                      <div className="flex justify-between">
                        <div className="flex gap-5">
                          <img src={`https://img.icons8.com/color/48/000000/${fileType}.png`} alt={`${fileType}`} className="h-10" />
                          <div>
                            <h1 className="text-lg font-bold">{doc.title}</h1>
                            <p className="text-sm">{doc.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <Button onClick={()=>handleDelete(doc)}><img src="/del.png" className="h-[22px] w-[22px]" /></Button>
                          <Button onClick={()=>handleDownload(doc)} disabled={loading}><img src="/view.png" className="h-[22px] w-[22px]" /></Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : null
            }
            </div>:<div>
            {
    user && currentDoc != null ? (
      currentDoc.map((doc) => {
       
        let fileType = doc.fileType;

      
        if (fileType.endsWith('x')) {
          fileType = fileType.slice(0, -1);
        }

       
        if (fileType === "jpeg") {
          fileType = "jpg";
        }

        return (
          <div className="p-2 pb-5" key={doc._id}>
            <div className="flex justify-between">
              <div className="flex gap-5">
                <img src={`https://img.icons8.com/color/48/000000/${fileType}.png`} alt={`${fileType}`} className="h-10" />
                <div>
                  <h1 className="text-lg">{doc.title}</h1>
                  <p className="text-sm">{doc.description}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button onClick={()=>handleDelete(doc)}><img src="/del.png" className="h-[22px] w-[22px]" /></Button>
                <Button onClick={()=>handleDownload(doc)} disabled={loading}><img src="/view.png" className="h-[22px] w-[22px]" /></Button>
              </div>
            </div>
          </div>
        );
      })
    ) : null
  }
              </div>
        }
      </div>

      </div>
      <Footer />
      {openDialog && <DialogBox openDialog={openDialog} setOpenDialog={setOpenDialog}/>}
    </div>
  );
}
