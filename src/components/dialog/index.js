'use client'
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { initialForm } from "@/utils";


import { useUser } from "@clerk/nextjs";
import { createDocument } from "@/actions";
import { toast } from "react-toastify";



const SupabaseClient = createClient('https://your-supabase-url.supabase.co','your-anon-key');


const DialogBox = ({ openDialog, setOpenDialog }) => {
    const [uploadForm, setUploadForm] = useState(initialForm);
    const [file, setFile] = useState(null);
    const { user } = useUser(); 



    function close() {
        setOpenDialog(false);
    }

    

    async function handleSubmit(event) {
        
        event.preventDefault();
        if (user) {
            const updatedForm = {
                ...uploadForm,
                userId: user.id
            };
        

        console.log(updatedForm)
        await createDocument(updatedForm);
        }
        toast.success("Document uploaded successfully");
        setUploadForm(initialForm);
        setFile(null);
        close();
    }

    async function handleUploadPdfToSupabase(selectedFile) {
        const parts = selectedFile.name.split(".");
        const fileType = parts[parts.length - 1];
        const unique=`${user.id}_${Date.now()}_${selectedFile.name}`
        const { data, error } = await SupabaseClient.storage
          .from("docs-board-public")
          .upload(`public/${unique}`, selectedFile, {
            cacheControl: "3600",
            upsert: false,
          });
    
        if (error) {
            console.error("Error uploading file:", error);
            toast.error("Error uploading file");
            return; 
        }
    
        console.log("Upload successful:", data);


        if (data && data.path) {
            setUploadForm({
                ...uploadForm,
                document: data.path, 
                fileType: fileType,
            });
        } else {
            console.error("Upload successful but no path returned.");
            toast.error("Upload successful but no path returned.");
        }
    
        
    }
    



    function handleFileChange(event) {
        event.preventDefault();
        const selectedFile = event.target.files[0];
        if(selectedFile){
            setFile(selectedFile);
            handleUploadPdfToSupabase(selectedFile);
        }
        console.log(file)
    }

    return (
        <form onSubmit={handleSubmit} className="p-2">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-5 rounded-lg shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Upload Document</h2>
                    <div>
                        <input type="file" className="mb-4" onChange={handleFileChange} />
                        <Input
                            placeholder="Document Title"
                            value={uploadForm.title}
                            onChange={(event) => 
                                setUploadForm({ 
                                    ...uploadForm, 
                                    title: event.target.value 
                                })
                            }
                            className="mb-4"
                        />
                        <Input
                            placeholder="Document Description"
                            value={uploadForm.description}
                            onChange={(event) => 
                                setUploadForm({ 
                                    ...uploadForm, 
                                    description: event.target.value 
                                })
                            }
                            className="mb-4"
                        />
                        
                    </div>
                    <div className="flex justify-end">
                        <Button onClick={close}>Cancel</Button>
                        <Button className="ml-2" type="submit">Upload</Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default DialogBox;
