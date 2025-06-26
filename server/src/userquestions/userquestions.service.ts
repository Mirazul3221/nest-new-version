import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserquestionDto } from './dto/create-userquestion.dto';
import { UpdateUserquestionDto } from './dto/update-userquestion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsersQuestion, QuestionDocument } from './schema/userquestions.schema';
import { Model, Types } from 'mongoose';
import axios from 'axios';

@Injectable()
export class UserquestionsService {
  // private readonly GEMINI_API_URL =
  //   'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';

  private readonly GEMINI_API_URL =
    'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

  private readonly geminiApiKey: string;
  constructor(
    @InjectModel(UsersQuestion.name)
    private QuestionModel: Model<QuestionDocument>,
    private readonly configService: ConfigService,
  ) {
    this.geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');
  }
  async getGeminiAnswer(question: any): Promise<string> {
    try {
      const response = await axios.post(
        `${this.GEMINI_API_URL}?key=${this.geminiApiKey}`,
        {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const candidates = response.data?.candidates;
      if (candidates && candidates.length > 0) {
        return candidates[0].content.parts[0].text;
      } else {
        return 'No valid response from Gemini.';
      }
    } catch (error) {
      console.error('Gemini API error:', error.response?.data || error.message);
      throw new Error('Failed to generate Gemini response.');
    }
  }

  async create(createUserquestionDto: CreateUserquestionDto, user) {
    const {
      subject,
      chapter,
      prevExam,
      question,
      option_01,
      option_02,
      option_03,
      option_04,
      content,
    } = createUserquestionDto;
    const createSlug = (text) => {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9/s-]/g, '-')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    };
    const date = new Date().getTime();
    const slug = createSlug(
      'bcs-preparation-online-' +
        subject +
        '-' +
        chapter +
        '-' +
        question +
        '-' +
        date,
    );
    const fullSchema = {
      slug,
      userId: user._id,
      userName: user.name,
      ...createUserquestionDto,
    };
    const existedQuestion = await this.QuestionModel.find({ question });

    const hasExistingQuestion = existedQuestion.some(
      (ex) => ex.question == question,
    );
    const hasExistingChapter = existedQuestion.some(
      (ex) => ex.chapter == chapter,
    );
    const hasExistingPrevExam = existedQuestion.some(
      (ex) => ex.prevExam == prevExam,
    );
    const hasExistingContent = existedQuestion.some(
      (ex) => ex.content == content,
    );

    if (
      hasExistingQuestion &&
      hasExistingChapter &&
      hasExistingPrevExam &&
      hasExistingContent
    ) {
      throw new ConflictException(
        'This question already exist, please add a new one',
      );
    } else {
      const createQuestion = new this.QuestionModel(fullSchema);
      await createQuestion.save();
      return 'Question create success';
    }
  } //

  async generateDescriptionByAi({ subject, chapter, question, content }) {
    if (!subject || !chapter || !question) {
      return 'Please add a question set its subject and chapter to get a right description!';
    }

    if (content) {
      return content;
    }

const prompt = `
Create a descriptive explanation based on the following input:

- Subject: ${subject}
- Chapter: ${chapter}
- Question: ${question}

Instructions:
- If the question is in Bangla, write the explanation in Bangla.
- If the question is in English, write the explanation in English.
- If the question involves Math, format all mathematical expressions using LaTeX syntax inside double dollar signs ($$ ... $$), so they can be rendered correctly in a Jodit-based rich text editor.
- Use double dollar signs to wrap every math expression, for example:
  $$
  a^2 + b^2 = (a + b)^2 - 2ab
  $$
 - if the digit is english you may wrap math expression in english digit, for example:   
  $$
  1/2 + 1/3 = 5/6
  $$
 - if the digit is bangla you may wrap math expression in bangla digit, for example:   
  $$
  ১/২ + ১/৩ = ৫/৬
  $$
- else if the digit is in other language you may wrap math expression in other language digit.   
- Use <b>, <ul><li>, <span style="color:(perfect color for highlight)">, and <br/> to format important points and improve readability.
- Write in a structured, clear, and teacher-like style with logical separation of ideas.
- The explanation should be minimum 100 and maximum 1000 words. if the answer ends less than 100 words you can generate less.
- Avoid any filler content — focus only on the important concepts and explanation.
- Do not include any preface or closing remarks — return only the description body.

Output only the description content, no headings, no titles, no extra wrapping text.
`;
    const genData = await this.getGeminiAnswer(prompt);
    return genData;
  }

  async getQuestionTag(tagName01, tagName02) {
    const grouped = await this.QuestionModel.aggregate([
      {
        $group: {
          _id: { subject: '$subject', chapter: '$chapter' },
        },
      },
      {
        $group: {
          _id: '$_id.subject',
          chapters: { $addToSet: '$_id.chapter' },
        },
      },
      {
        $project: {
          _id: 0,
          subject: '$_id',
          chapter: '$chapters',
        },
      },
    ]);
    return grouped;
  }

  async edit(question, id) {
    await this.QuestionModel.findByIdAndUpdate(id, question, { new: true });
    return null;
  }
  async deleteQuestion(id) {
    await this.QuestionModel.findByIdAndDelete(id);
    return null;
  }

  async createComment(commentSchema, questionId) {
    const targetQuestion = await this.QuestionModel.findById(questionId);
    targetQuestion.comments.push(commentSchema);
    await targetQuestion.save();
    return await commentSchema;
  }
  /////////////////////////////////////////////////////////////////////////////////////
  async createLike(userId, questionId) {
    const targetQuestion = await this.QuestionModel.findById(questionId);
    if (targetQuestion.likes.includes(userId)) {
      return 'Already Liked the question';
    } else {
      targetQuestion.likes.push(userId);
      await targetQuestion.save();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  async findMyAllQuestions(id, skip) {
    const filteredQuestions = await this.QuestionModel.aggregate([
      { $match: { userId: id } },

      { $unwind: { path: '$comments', preserveNullAndEmptyArrays: true } },

      // Sort the comments in descending order by their `createdAt`
      { $sort: { 'comments.createdAt': -1 } },
      {
        $lookup: {
          from: 'readers', // The name of the user profiles collection
          localField: 'userId', // The field in the questions collection
          foreignField: '_id', // The field in the users collection
          as: 'userProfile', // The name of the new field to store the joined data
        },
      },
      {
        $unwind: {
          path: '$userProfile',
          preserveNullAndEmptyArrays: true, // Optional: keep questions even if user profile doesn't exist
        },
      },
      {
        $skip: +skip, // Skip the required number of documents
      },
      {
        $limit: 10, // Limit the number of documents
      },
      // Group back all fields and collect the sorted comments

      {
        $group: {
          _id: '$_id', // Group by question ID
          chapter: { $first: '$chapter' },
          content: { $first: '$content' },
          createdAt: { $first: '$createdAt' },
          likes: { $first: '$likes' },
          option_01: { $first: '$option_01' },
          option_02: { $first: '$option_02' },
          option_03: { $first: '$option_03' },
          option_04: { $first: '$option_04' },
          prevExam: { $first: '$prevExam' },
          question: { $first: '$question' },
          rightAns: { $first: '$rightAns' },
          slug: { $first: '$slug' },
          subject: { $first: '$subject' },
          updatedAt: { $first: '$updatedAt' },
          userId: { $first: '$userId' },
          userName: { $first: '$userName' },
          userProfile: { $first: '$userProfile' },
          __v: { $first: '$__v' },
          recentComments: { $push: '$comments' }, // Collect all sorted comments
        },
      },
      { $sort: { createdAt: -1 } },

      {
        $project: {
          chapter: 1,
          content: 1,
          createdAt: 1,
          likes: 1,
          option_01: 1,
          option_02: 1,
          option_03: 1,
          option_04: 1,
          prevExam: 1,
          question: 1,
          rightAns: 1,
          slug: 1,
          subject: 1,
          updatedAt: 1,
          userId: 1,
          userName: 1,
          profile: '$userProfile.profile',
          __v: 1,
          comments: { $slice: ['$recentComments', 0, 2] }, // Limit to two comments
          totalComments: { $size: '$recentComments' }, // Count the total number of comments
          // comments: { $reverseArray: { $slice: ["$recentComments", 0, 2] } }, // Reverse the array
        },
      },
    ]);
    return filteredQuestions;
  } ////////

  async getAQuestion(slug) {
    const result = await this.QuestionModel.find(
      { slug },
      { comments: { $slice: -1 } },
    );
    return result;
  }

  async findMyFriendsAllQuestions(
    id: string,
    skip: number,
    flug: string,
    tag: string,
  ) {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user ID');
    }

    const objectId = new Types.ObjectId(id);

    const variant: any = {
      userId: { $ne: objectId }, // Exclude user's own questions properly
    };

    if (flug && flug !== 'all' && tag) {
      variant[flug] = tag;
    }

    const questions = await this.QuestionModel.aggregate([
      { $match: variant },
      {
        $lookup: {
          from: 'readers',
          localField: 'userId',
          foreignField: '_id',
          as: 'userProfile',
        },
      },
      {
        $unwind: {
          path: '$userProfile',
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: { createdAt: -1 } },
      { $skip: +skip },
      { $limit: 10 },
      {
        $project: {
          slug: 1,
          userId: 1,
          userName: 1,
          profile: '$userProfile.profile',
          subject: 1,
          chapter: 1,
          prevExam: 1,
          question: 1,
          option_01: 1,
          option_02: 1,
          option_03: 1,
          option_04: 1,
          rightAns: 1,
          content: 1,
          likes: 1,
          comments: { $slice: ['$comments', -2] },
          totalComments: { $size: '$comments' },
          createdAt: 1,
        },
      },
    ]);

    return questions;
  }

  async testQ() {
    return await this.QuestionModel.find();
  }

  async findMyFriendsAllQuestionComments(id, skip) {
    const result = await this.QuestionModel.findById(id);
    const sliceComments = result.comments
      .reverse()
      .slice((skip - 1) * 5, skip * 5);
    return { comments: sliceComments, total: result.comments.length };
  }

  /////////////////////////////////////////////////////////////////////////////////////////
  async getSuggestions(query: string): Promise<string[]> {
    const regex = new RegExp(query, 'i'); // case-insensitive regex
    const results = await this.QuestionModel.find({
      $or: [{ question: regex }],
    })
      .select('question') // Only fetch these fields
      .limit(15)
      .exec();

    // You can return any field you prefer — here we prioritize title
    return results.map((item) => item.question || '');
  }

  ///////////////////////////////////////////////////////////////////////
    async searchQuestionByQuery(q){
    let option = {}
   if(q){
    option = {
      $or : [
        {subject : new RegExp(q.toLowerCase(),"i")},
        {question : new RegExp(q.toLowerCase(),"i")},
      ]
    }
   }

    const data = await this.QuestionModel.find(option)
    const shuffle = function (array) {
      let randomArr = [];
      let indexArr = [];
      let i = 0;
      while (i < array.length) {
        let randomNumber = Math.floor(Math.random() * array.length);
        if (!indexArr.includes(randomNumber)) {
          randomArr.push(array[randomNumber]);
          indexArr.push(randomNumber);
          i++;
        }
      }
      return randomArr; //
    };

   return data
  }

  findAll() {
    return `This action returns all userquestions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userquestion`;
  }

  update(id: number, updateUserquestionDto: UpdateUserquestionDto) {
    return `This action updates a #${id} userquestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} userquestion`;
  }
}
