import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongodb';
import Post from '@/models/Post';
import Comment from "@/models/Comment.js";
import User from '@/models/user.js'

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    console.log(id)

    const post = await Post.findById(id)
      .populate({
        path: 'comments',
        populate: {
          path: 'authorId'
        }
      })

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await connectDB();

    // Delete the post
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return new Response(JSON.stringify({ error: 'Post not found' }), { status: 404 });
    }

    // Delete associated comments
    await Comment.deleteMany({ post: id });

    return new Response(JSON.stringify({ message: 'Post and comments deleted successfully' }), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Failed to delete post' }), { status: 500 });
  }
}
