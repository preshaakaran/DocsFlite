'use server'
import connectToDB from "@/database";
import User from "@/models";



export async function createDocument(formData) {
    try {
        await connectToDB();
        await User.create(formData);
    } catch (error) {
        console.error("Error creating document:", error);
        throw new Error("Failed to create document");
    }
}

export async function getDocuments(id) {
    try {
        await connectToDB();
        const documents = await User.find({ userId: id });
        return JSON.parse(JSON.stringify(documents));
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw new Error("Failed to fetch documents");
    }
}

export async function deleteDocument(id) {
    try {
        await connectToDB();
        await User.deleteOne({ _id: id });
        
    } catch (error) {
        console.error("Error deleting document:", error);
        throw new Error("Failed to delete document");
        
    }
}    