import { connectDB } from "@/utils/mongodb.js";
import Comment from '@/models/Comment';
import { auth } from '@/auth'

export async function PUT(req, { params }) {
    // Connect to your DB
    await connectDB();

    // Authenticate the user
    const session = await auth();
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Destructure the commentId from params (do NOT await params)
    const { id: commentId } = await params;
    if (!commentId) {
        return new Response(JSON.stringify({ error: "Missing commentId" }), { status: 400 });
    }

    // Parse the request body safely
    let body;
    try {
        body = await req.json();
    } catch (err) {
        return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
    }

    const { voteType } = body;
    const userId = session.user.id;

    // Validate voteType
    if (!["upvote", "downvote"].includes(voteType)) {
        return new Response(JSON.stringify({ error: "Invalid vote type" }), { status: 400 });
    }

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return new Response(JSON.stringify({ error: "Comment not found" }), { status: 404 });
        }

        // Remove user from both upvotes and downvotes first
        comment.upvotes.pull(userId);
        comment.downvotes.pull(userId);

        // Add user based on the vote type
        if (voteType === "upvote") {
            comment.upvotes.push(userId);
        } else if (voteType === "downvote") {
            comment.downvotes.push(userId);
        }

        await comment.save();

        return new Response(
            JSON.stringify({
                success: true,
                upvotes: comment.upvotes.length,
                downvotes: comment.downvotes.length,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in PUT /api/forum/comments/[commentId]:", error);
        return new Response(JSON.stringify({ error: "Server Error" }), { status: 500 });
    }
}
