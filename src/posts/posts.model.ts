import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  title: { type: String, required: true },
  comment: { type: String, required: true },
});

export interface Post extends mongoose.Document {
  id: string;
  userId: string;
  title: string;
  comment: string;
}
