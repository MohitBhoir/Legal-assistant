import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  createdAt: { type: Date, default: Date.now, required: true },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


export default mongoose.models?.Comment || mongoose.model('Comment', CommentSchema);
