import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongodb';
import Comment from '@/models/Comment';
import Post from '@/models/Post';

export async function POST(req, { params }) {
  try {
    await connectDB();

    const { id: postId } = await params;

    let body;
    try {
      body = await req.json();
    } catch (err) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { content, authorId } = body || {};

    if (!content || !authorId || !postId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create the comment
    const newComment = new Comment({
      content,
      authorId,
      post: postId,
    });

    await newComment.save();

    // Push comment to post
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    return NextResponse.json({ message: 'Comment added successfully', comment: newComment }, { status: 201 });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}