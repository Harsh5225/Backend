import mongoose, { mongo, Types } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema=new mongoose.Schema({
videoFile:{
type:String, // cloudinary url
required:true,
},
thumbnail:{
  type:String, // cloudinary url
required:true,
},
title:{
  type:String, 
required:true,
},
description:{
  type:String, 
required:true,
},
duration:{
  type:Number, // cloudinary
required:true,
},
view:{
  type:Number,
  default:0
},
isPublished:{
  type:Boolean,
  default:true
},
owner:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
}
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema);

// agination is a crucial part of any application that handles large datasets, ensuring that data is presented in manageable chunks and improving performance