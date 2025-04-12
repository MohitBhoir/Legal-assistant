import { NextResponse } from 'next/server';
import { auth } from '@/auth'; // using your exported auth
import Post from '@/models/Post';
import { connectDB } from '@/utils/mongodb.js';

export async function POST(req) {
  try {
    await connectDB();
    const session = await auth();


    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, category } = body;

    if (!title || !content || !category) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newPost = new Post({
      title,
      content,
      category,
      authorId: session.user.id,
    });

    await newPost.save();

    return NextResponse.json({ message: 'Post created successfully', post: newPost }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();

    const posts = await Post.find().populate({
      path: 'authorId',
      select: '_id image name'
    }).sort({ createdAt: -1 }); // latest first

    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

