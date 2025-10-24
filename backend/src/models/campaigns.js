import mongoose from "mongoose";

function arrayMinLength(val) {
  return val.length > 3;
}

function validateTagLimit(val) {
  return val.length <= 2;
}

const CampaignSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A campaign must have a creator."],
    },

    title: {
      type: String,
      required: [true, "Title cannot be empty"],
    },
    discription: {
      type: String,
      required: [true, "Description cannot be empty"],
      maxlength: [51, "Description must be at max 51 characters long"],
    },

    content: {
      type: String,
      required: [true, "Project description cannot be empty"],
    },

    youtubeUrl: {
      type: String,
      required: [true, "YouTube URL is required"],
    },

    goalAmount: {
      type: Number,
      required: [true, "Funds must be a number"],
    },

    imageUrls: {
      type: [String],
      required: true,
      validate: [arrayMinLength, "At least 4 images are required."],
    },

    faq: [
      {
        Question: {
          type: String,
          required: true,
        },
        Answer: {
          type: String,
          required: true,
        },
      },
    ],

    tags: {
      type: [String],
      validate: [validateTagLimit, "A maximum of 2 tags are allowed."],
    },

    currentAmount: {
      type: Number,
      default: 0,
    },

    totalBackers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const campaigns = mongoose.model("campaigns", CampaignSchema);
