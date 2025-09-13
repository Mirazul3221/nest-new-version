import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Reader, user_model } from './schema/auth.schema';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user-dto';
// import { UpdateAuthProfileDto } from './dto/update-auth.dto';
// import { setTimeout } from 'timers/promises';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import {
  FriendRequest,
  FriendRequestDocument,
} from 'src/friend-request/schemas/friend-request.schema';
import {
  SessionSchemaName,
  SessionSchema,
  Session,
} from 'src/loginstatus/schema/schema';
const nodemailer = require('nodemailer');
import { v4 as uuidv4 } from 'uuid';
import { UAParser } from 'ua-parser-js';
import axios from 'axios';
import { Types } from 'mongoose';
import { nanoid } from 'nanoid'; // ✅ now allowed because v3.3.4 is CJS
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user_model)
    private userModel: mongoose.Model<Reader>,
    @InjectModel(FriendRequest.name)
    private friendRequestModel: mongoose.Model<FriendRequestDocument>,
    @InjectModel(SessionSchemaName)
    private sessionModel: mongoose.Model<Session>,
    private jwtService: JwtService,
    private readonly ConfigService: ConfigService,
    private readonly mailService: MailService
  ) {}

  async verifyAccount(userData) {
    const { email, password, name } = userData; //
    const userInfo = await this.userModel.findOne({ email });
    if (userInfo) {
      throw new ConflictException('User already exist ! ');
    }

    const token = await this.jwtService.sign(
      { ...userData, password: password }, // or userData if needed
      { expiresIn: '30d' }, // Override default here
    );

    const mailOptions = {
      from: '"info.eduplusplus@gmail.io" <toriquldev000@gmail.com>',
      to: email,
      subject: 'Account Verification Process - Eduplusplus',
      html: `
          <div
                    style="
                      background-color: #f1f5f8;
                      margin: 0;
                      padding: 0;
                      font-family: Helvetica, Arial, Helvetica, sans-serif;
                      color: #111111;
                      font-size: 14px;
                      line-height: 18px;
                    "
                  >
                    <table
                      cellpadding="0"
                      cellspacing="0"
                      style="
                        background-color: #e4ebf1;
                        min-width: 413px;
                        min-width: 320px;
                      "
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td
                            valign="top"
                            style="
                              font-family: Helvetica, Arial, Helvetica,
                                sans-serif;
                              color: #111111;
                              font-size: 14px;
                              line-height: 18px;
                            "
                          >
                            <table cellpadding="0" cellspacing="0" width="100%">
                              <tbody>
                                <tr>
                                  <td
                                    bgcolor="#3e19fa"
                                    height="150"
                                    style="
                                      font-family: Helvetica, Arial, Helvetica,
                                        sans-serif;
                                      color: #111111;
                                      font-size: 14px;
                                      line-height: 18px;
                                    "
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>

                          <td
                            width="600"
                            style="
                              font-family: Helvetica, Arial, Helvetica,
                                sans-serif;
                              color: #111111;
                              font-size: 14px;
                              line-height: 18px;
                            "
                          >
                            <table
                              align="center"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                width: 100%;
                                max-width: 600px;
                                margin: 0 auto;
                              "
                              width="600"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    align="center"
                                    bgcolor="#3e19fa"
                                    style="
                                      font-family: Helvetica, Arial, Helvetica,
                                        sans-serif;
                                      color: #111111;
                                      font-size: 14px;
                                      line-height: 18px;
                                      padding: 20px 15px 24px;
                                    "
                                  >
                                    <a
                                      href="https://bcs-prep.vercel.app"
                                      style="
                                        font-family: Helvetica, Arial, Helvetica,
                                          sans-serif;
                                        font-size: 14px;
                                        line-height: 18px;
                                        font-weight: bold;
                                        color:wheat;
                                        text-decoration: none;
                                      "
                                      target="_blank"
                                    >
                                      <div
                                        style="
                                          font-size: 18px;
                                          font-weight: bold;
                                          color: #ffffff;
                                        "
                                      >
                                        Edu<sup>++</sup> (Online platform)
                                      </div>
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    bgcolor="#0071ba"
                                    style="
                                      font-family: Helvetica, Arial, Helvetica,
                                        sans-serif;
                                      color: #111111;
                                      font-size: 14px;
                                      line-height: 18px;
                                      border-radius: 0 0 10px 10px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            bgcolor="#ffffff"
                                            style="
                                              font-family: Helvetica, Arial,
                                                Helvetica, sans-serif;
                                              color: #111111;
                                              font-size: 14px;
                                              line-height: 18px;
                                              border-radius: 6px;
                                            "
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      font-family: Helvetica,
                                                        Arial, Helvetica,
                                                        sans-serif;
                                                      color: #111111;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                      padding-left: 15px;
                                                      padding-right: 15px;
                                                      padding-top: 25px;
                                                      padding: 36px 40px 18px;
                                                    "
                                                  >
                                                    <table
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="left"
                                                            style="
                                                              font-family: Helvetica,
                                                                Arial, Helvetica,
                                                                sans-serif;
                                                              color: #111111;
                                                              font-size: 14px;
                                                              line-height: 18px;
                                                              padding: 0 0 8px;
                                                              font: 500 24px/22px
                                                                  Arial,
                                                                Helvetica,
                                                                sans-serif, Fira;
                                                              color: #3e19fa;
                                                            "
                                                          >
                                                            Verify Your Email
                                                            Address
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td
                                                            align="center"
                                                            style="
                                                              font-family: Helvetica,
                                                                Arial, Helvetica,
                                                                sans-serif;
                                                              color: #111111;
                                                              font-size: 14px;
                                                              line-height: 18px;
                                                              padding: 0 0 14px;
                                                              font: 600 14px/18px
                                                                  Arial,
                                                                Helvetica,
                                                                sans-serif, Fira;
                                                              color: #0066b8;
                                                              border-bottom: 1px
                                                                solid #c7cfd9;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <br />
                                                    <br />
                                                   Hi, ${name}
                                                    <br />
                                                    <br />
                                                    Congratulations! You're
                                                    almost set to start using
                                                    edu++.
                                                    <br />
                                                    Just click the button below
                                                    to validate your email
                                                    address.
                                                    <table
                                                      align="center"
                                                      cellpadding="0"
                                                      cellspacing="0"
                                                      style="
                                                        margin: 0 auto;
                                                        padding: 40px;
                                                      "
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="center"
                                                            bgcolor="#3e19fa"
                                                            style="
                                                              font-family: Helvetica,
                                                                Arial, Helvetica,
                                                                sans-serif;
                                                              color: #111111;
                                                              font-size: 14px;
                                                              line-height: 18px;
                                                              font: 500 32px/18px
                                                                  Arial,
                                                                Helvetica,
                                                                sans-serif, Fira;
                                                              letter-spacing: 0.4px;
                                                              border-radius: 5px;
                                                            "
                                                          >
                                                            <a
                                                              href="https://bcs-prep.vercel.app/verify-account?token=${token}"
                                                              style="
                                                                font-family: Helvetica,
                                                                  Arial,
                                                                  Helvetica,
                                                                  sans-serif;
                                                                font-size: 14px;
                                                                line-height: 18px;
                                                                font-weight: bold;
                                                                padding: 20px;
                                                                color: #fff;
                                                                text-decoration: none;
                                                                display: block;
                                                              "
                                                              target="_blank"
                                                              >Verify Email
                                                            </a>
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <table
                                                      style="
                                                        padding: 0px 0px 20px;
                                                      "
                                                      width="100%"
                                                    >
                                                      <tbody>
                                                        <tr>
                                                          <td
                                                            align="center"
                                                            style="
                                                              font-family: Helvetica,
                                                                Arial, Helvetica,
                                                                sans-serif;
                                                              color: #111111;
                                                              font-size: 14px;
                                                              line-height: 18px;
                                                              padding: 0 0 1px;
                                                              font: 600 14px/18px
                                                                  Arial,
                                                                Helvetica,
                                                                sans-serif, Fira;
                                                              color: #0066b8;
                                                              border-bottom: 1px
                                                                solid #c7cfd9;
                                                            "
                                                          ></td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                    <div
                                                      style="
                                                        font-size: 12px;
                                                        font-weight: normal;
                                                      "
                                                    >
                                                      You need to perform this
                                                      validation within the next 1 month (720 hours) to
                                                      start using this edu++
                                                      app.
                                                      <br />
                                                      If the button does not
                                                      work for any reason, you
                                                      can also paste the
                                                      following into your
                                                      browser:
                                                      <a
                                                        href="https://bcs-prep.vercel.app/verify-account?token=${token}"
                                                        style="
                                                          font-family: Helvetica,
                                                            Arial, Helvetica,
                                                            sans-serif;
                                                          font-size: 14px;
                                                          line-height: 18px;
                                                          font-weight: bold;
                                                          color: #005ce4;
                                                          font-size: 12px;
                                                          font-weight: normal;
                                                        "
                                                        target="_blank"
                                                        >https://bcs-prep.vercel.app/verify-account?token=${token}</a
                                                      >
                                                      <br />
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    style="
                                      font-family: Helvetica, Arial, Helvetica,
                                        sans-serif;
                                      color: #111111;
                                      font-size: 14px;
                                      line-height: 18px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding: 20px 40px 20px;
                                    "
                                  >
                                    <table
                                      cellpadding="0"
                                      cellspacing="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <th
                                            align="left"
                                            style="
                                              font-weight: normal;
                                              text-align: left;
                                              display: block;
                                              width: 100%;
                                              box-sizing: border-box;
                                              vertical-align: top;
                                            "
                                            width="140"
                                          >
                                            <table
                                              cellpadding="0"
                                              cellspacing="0"
                                              style="
                                                float: none;
                                                margin: 0 auto;
                                              "
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style="
                                                      font-family: Helvetica,
                                                        Arial, Helvetica,
                                                        sans-serif;
                                                      color: #111111;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                    "
                                                  >
                                                    <a
                                                      href="#"
                                                      style="
                                                        font-family: Helvetica,
                                                          Arial, Helvetica,
                                                          sans-serif;
                                                        font-size: 14px;
                                                        line-height: 18px;
                                                        font-weight: bold;
                                                        color: #005ce4;
                                                        text-decoration: none;
                                                      "
                                                      target="_blank"
                                                      data-saferedirecturl="https://www.google.com/url?q=https://discord.gg/Cloudinary&amp;source=gmail&amp;ust=1752787985482000&amp;usg=AOvVaw3subJr85y8KMWjNKfw0kcl"
                                                    >
                                                      <img
                                                        alt="Discord"
                                                        src="https://ci3.googleusercontent.com/meips/ADKq_Nbia12i4y9ALfdvzL9-RdtFsa7Z4KC5Vbfy9i2sZjvN4SK9L2dhYqCp8bZxONskgDMSes70Ywfn-fM4C-ErTb98mtRQWBO03AQwA5usbRWx0JaSZlEC8vL39g2wFAXVj6bNB57UaV6s0hNIrp2ANQ=s0-d-e1-ft#https://cloudinary-res.cloudinary.com/image/upload/w_33,dpr_2.0/mail/ico-discord-dark.png"
                                                        style="
                                                          width: 33px;
                                                          vertical-align: top;
                                                        "
                                                        width="33"
                                                        class="CToWUd"
                                                        data-bit="iit"
                                                      />
                                                    </a>
                                                  </td>
                                                  <td
                                                    width="14"
                                                    style="
                                                      font-family: Helvetica,
                                                        Arial, Helvetica,
                                                        sans-serif;
                                                      color: #111111;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                    "
                                                  ></td>
                                                  <td
                                                    style="
                                                      font-family: Helvetica,
                                                        Arial, Helvetica,
                                                        sans-serif;
                                                      color: #111111;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                    "
                                                  >
                                                    <a
                                                      href="https://www.facebook.com/profile.php?id=100089694753522"
                                                      style="
                                                        font-family: Helvetica,
                                                          Arial, Helvetica,
                                                          sans-serif;
                                                        font-size: 14px;
                                                        line-height: 18px;
                                                        font-weight: bold;
                                                        color: #005ce4;
                                                        text-decoration: none;
                                                      "
                                                      target="_blank"
                                                      data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/Cloudinary&amp;source=gmail&amp;ust=1752787985482000&amp;usg=AOvVaw13eYqjA1U2mM_bFB2WTH_2"
                                                    >
                                                      <img
                                                        alt="Facebook"
                                                        src="https://ci3.googleusercontent.com/meips/ADKq_NZU2yzsJ67ivGrSvbnbGlbF_668jnJeVVq--n131XoKcvT51leilCS_RWRYn8qpsaZmkqSoSb1Bf81zsLVbUttU4bYPrkMuQIlfx9UOQ367UQK7Cj-WyoVM_a4MzWR9xjiO_kg3gxdfuFwQuEP4nGk=s0-d-e1-ft#https://cloudinary-res.cloudinary.com/image/upload/w_33,dpr_2.0/mail/ico-facebook-dark.png"
                                                        style="
                                                          width: 33px;
                                                          vertical-align: top;
                                                        "
                                                        width="33"
                                                        class="CToWUd"
                                                        data-bit="iit"
                                                      />
                                                    </a>
                                                  </td>
                                                  <td
                                                    width="14"
                                                    style="
                                                      font-family: Helvetica,
                                                        Arial, Helvetica,
                                                        sans-serif;
                                                      color: #111111;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                    "
                                                  ></td>
                                                  <td
                                                    style="
                                                      font-family: Helvetica,
                                                        Arial, Helvetica,
                                                        sans-serif;
                                                      color: #111111;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                    "
                                                  >
                                                    <a
                                                      href="https://www.linkedin.com/in/toriqul-islam-447379278"
                                                      style="
                                                        font-family: Helvetica,
                                                          Arial, Helvetica,
                                                          sans-serif;
                                                        font-size: 14px;
                                                        line-height: 18px;
                                                        font-weight: bold;
                                                        color: #005ce4;
                                                        text-decoration: none;
                                                      "
                                                      target="_blank"
                                                      data-saferedirecturl="https://www.google.com/url?q=https://www.linkedin.com/company/2725088/&amp;source=gmail&amp;ust=1752787985483000&amp;usg=AOvVaw0UMRGzhYOcG6vlp_w9XWHW"
                                                    >
                                                      <img
                                                        alt="Linkedin"
                                                        src="https://ci3.googleusercontent.com/meips/ADKq_NaRA3XNxBo9W3R5I3QglzH2qvQWdHSvsSvoDCMcGCkEqEXsN9FYuPRbCXRjR-I9KVzHx9hVeRNPwgHVY2akKxLMjQ6pceVI0pfQDiaglm6FZEF3QO1TTt-Rq8j9H7o8ow1D8C206A3HB_j8qYLsaGE=s0-d-e1-ft#https://cloudinary-res.cloudinary.com/image/upload/w_33,dpr_2.0/mail/ico-linkedin-dark.png"
                                                        style="
                                                          width: 33px;
                                                          vertical-align: top;
                                                        "
                                                        width="33"
                                                        class="CToWUd"
                                                        data-bit="iit"
                                                      />
                                                    </a>
                                                  </td>
                                                  <td
                                                    width="14"
                                                    style="
                                                      font-family: Helvetica,
                                                        Arial, Helvetica,
                                                        sans-serif;
                                                      color: #111111;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                    "
                                                  ></td>
                                                  <td
                                                    style="
                                                      font-family: Helvetica,
                                                        Arial, Helvetica,
                                                        sans-serif;
                                                      color: #111111;
                                                      font-size: 14px;
                                                      line-height: 18px;
                                                    "
                                                  >
                                                    <a
                                                      href="#"
                                                      style="
                                                        font-family: Helvetica,
                                                          Arial, Helvetica,
                                                          sans-serif;
                                                        font-size: 14px;
                                                        line-height: 18px;
                                                        font-weight: bold;
                                                        color: #005ce4;
                                                        text-decoration: none;
                                                      "
                                                      target="_blank"
                                                      data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/cloudinary&amp;source=gmail&amp;ust=1752787985483000&amp;usg=AOvVaw2eGcTZXe2qej9N0DZz6hFe"
                                                    >
                                                      <img
                                                        alt="Twitter"
                                                        src="https://ci3.googleusercontent.com/meips/ADKq_NYyElM09gVyX_Zat30d5Gt4yVQZ42o-tbEkcQhBHAWY-MnJC9MzF-j93kKX6EquOT7xw-4_g_T-qE5I-txW3nUm2d8JaMR5clM7HGXBqcqGTbI8YUARtmKIx7hlJ9wJoTd9Jxgespnl2zR336a_8g=s0-d-e1-ft#https://cloudinary-res.cloudinary.com/image/upload/w_33,dpr_2.0/mail/ico-twitter-dark.png"
                                                        style="
                                                          width: 33px;
                                                          vertical-align: top;
                                                        "
                                                        width="33"
                                                        class="CToWUd"
                                                        data-bit="iit"
                                                      />
                                                    </a>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </th>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>

                          <td
                            valign="top"
                            style="
                              font-family: Helvetica, Arial, Helvetica,
                                sans-serif;
                              color: #111111;
                              font-size: 14px;
                              line-height: 18px;
                            "
                          >
                            <table cellpadding="0" cellspacing="0" width="100%">
                              <tbody>
                                <tr>
                                  <td
                                    bgcolor="#3e19fa"
                                    height="150"
                                    style="
                                      font-family: Helvetica, Arial, Helvetica,
                                        sans-serif;
                                      color: #111111;
                                      font-size: 14px;
                                      line-height: 18px;
                                    "
                                  ></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="yj6qo"></div>
                    <div class="adL"></div>
                  </div>
    `,
    };

    try {
      // await transporter.sendMail(mailOptions); // await without callback
     await this.mailService.sendMail(mailOptions)
    } catch (error) {
      console.log(error);
    }
  }

  async register_user(
    userData: any,
    req,
  ): Promise<{ token: string; msg: string }> {
    let payload: any;

    // 🔐 Verify token with error handling
    try {
      payload = await this.jwtService.verify(userData.token);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException(
          'Token expired. Please register again.',
        );
      } else {
        throw new UnauthorizedException('Invalid token.');
      }
    }

    const { name, email, password } = payload;

    // ❌ Check if user already exists
    const userInfo = await this.userModel.findOne({ email });
    if (userInfo) {
      throw new ConflictException('Account already exists!');
    }

    // ✅ Create user
    const allSubject = [
      { sub: 'বাংলা সাহিত্য', rightAns: 0, wrongAns: 0 },
      { sub: 'বাংলা ব্যাকরণ', rightAns: 0, wrongAns: 0 },
      { sub: 'ইংরেজি সাহিত্য', rightAns: 0, wrongAns: 0 },
      { sub: 'ইংরেজি ব্যাকরণ', rightAns: 0, wrongAns: 0 },
      { sub: 'গাণিতিক যুক্তি (পাটিগণিত)', rightAns: 0, wrongAns: 0 },
      { sub: 'গাণিতিক যুক্তি (বীজগণিত)', rightAns: 0, wrongAns: 0 },
      { sub: 'গাণিতিক যুক্তি (জ্যামিতি)', rightAns: 0, wrongAns: 0 },
      { sub: 'গাণিতিক যুক্তি (বিচ্ছিন্ন গণিত)', rightAns: 0, wrongAns: 0 },
      { sub: 'গাণিতিক যুক্তি (গতিবিদ্যা)', rightAns: 0, wrongAns: 0 },
      { sub: 'গাণিতিক যুক্তি (অন্যান্য)', rightAns: 0, wrongAns: 0 },
      { sub: 'বাংলাদেশ বিষয়াবলি', rightAns: 0, wrongAns: 0 },
      { sub: 'আন্তর্জাতিক বিষয়াবলি', rightAns: 0, wrongAns: 0 },
      { sub: 'সাধারণ বিজ্ঞান(ভৌত বিজ্ঞান)', rightAns: 0, wrongAns: 0 },
      { sub: 'সাধারণ বিজ্ঞান(জীববিজ্ঞান)', rightAns: 0, wrongAns: 0 },
      { sub: 'সাধারণ বিজ্ঞান(আধুনিক বিজ্ঞান)', rightAns: 0, wrongAns: 0 },
      { sub: 'মানসিক দক্ষতা', rightAns: 0, wrongAns: 0 },
      { sub: 'ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা', rightAns: 0, wrongAns: 0 },
      { sub: 'কম্পিউটার ও তথ্য প্রযুক্তি', rightAns: 0, wrongAns: 0 },
      { sub: 'নৈতিকতা, মূল্যবোধ ও সুশাসন', rightAns: 0, wrongAns: 0 },
    ];
    try {
      // 🌐 Get IP address
      let ip =
        req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
        req.socket?.remoteAddress ||
        req.ip;

      if (ip?.startsWith('::ffff:')) ip = ip.replace('::ffff:', '');

      if (
        ip === '::1' ||
        ip === '127.0.0.1' ||
        ip.startsWith('192.168') ||
        ip.startsWith('10.') ||
        ip.startsWith('172.')
      ) {
        if (process.env.NODE_ENV !== 'production') ip = '8.8.8.8';
      }

      // 📱 Device info
      const sessionId = uuidv4();
      const userAgent = req.headers['user-agent'];
      const parser = new UAParser(userAgent);
      const parsedUA = parser.getResult();

      // 🌍 Get geo-location from IP
      const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
      const data = geo.data;
      /////////////////////////////////////////////////////////////////////////////
      const new_user = await this.userModel.create({
      role: 'user',
      status: 'New',
      balance: 0,
      name,
      email,
      password: await bcrypt.hash(password, 9),
      location: {
        type: 'Point',
        coordinates: [data.longitude, data.latitude],
      },
      title: 'Untitled User',
      description: '',
      profile:
        'https://res.cloudinary.com/dqwino0wb/image/upload/v1724909787/Screenshot_3_qrv36z.png',
      otp: '',
      totalCountQuestions: allSubject,
      totalCountQuestionsId: [],
    });
      //////////////////////////////////////////////////////////////////////////////////////////////
      const geoLocation = `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;
      // 🛡️ Create session
      await this.sessionModel.create({
        userId: new_user._id,
        sessionId,
        ipAddress: ip,
        userAgent,
        device: parsedUA.device.model || 'Unknown device',
        browser: parsedUA.browser.name || 'Unknown browser',
        os: parsedUA.os.name || 'Unknown OS',
        location: geoLocation,
      });

      // 🧹 Delete old sessions (keep last 5)
      await this.sessionModel.deleteMany({
        userId: new_user._id,
        _id: {
          $nin: await this.sessionModel
            .find({ userId: new_user._id })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('_id')
            .then((docs) => docs.map((d) => d._id)),
        },
      });

      // 🪙 Create JWT
      const token = await this.jwtService.sign({
        id: new_user._id,
        sessionId,
        name: new_user.name,
        profile: new_user.profile,
        role: new_user.role,
      });

      return {
        token,
        msg: `Hey ${new_user.name}, Welcome, your registration process is accepted by our platform.`,
      };
    } catch (error) {
      console.log(error)
      throw new UnauthorizedException('Failed to create session or token.');
    }
  }

  //   async register_user(
  //     userData:any,
  //     req,
  //   ): Promise<{ token: string; msg: string }> {
  //     const { name, email, password, location } = await this.jwtService.verify(userData.token)
  //       return
  //     const userInfo = await this.userModel.findOne({ email });
  //     if (userInfo) {
  //       throw new ConflictException('User already exist ! ');
  //     } else {
  //       const allSubject = [
  //         { sub: 'Bangla', rightAns: 0, wrongAns: 0 },
  //         { sub: 'English', rightAns: 0, wrongAns: 0 },
  //       ];
  //       const new_user = await this.userModel.create({
  //         role: 'user',
  //         status: 'New',
  //         balance: 0,
  //         name: name,
  //         email: email,
  //         password: await bcrypt.hash(password, 9),
  //         location: {
  //           type: 'Point',
  //           coordinates: [location.lon, location.lat],
  //         },
  //         title: 'Untitled User',
  //         description: '',
  //         profile:
  //           'https://res.cloudinary.com/dqwino0wb/image/upload/v1724909787/Screenshot_3_qrv36z.png',
  //         otp: '',
  //         totalCountQuestions: allSubject,
  //         totalCountQuestionsId: [],
  //       });
  //       try {
  // ////////////////////////////////////////////////////////////////////////
  //       // Inside your method
  //       let ip =
  //         req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || // most reliable
  //         req.socket?.remoteAddress || // fallback
  //         req.ip; // fallback

  //       if (ip?.startsWith('::ffff:')) {
  //         ip = ip.replace('::ffff:', '');
  //       }

  //       if (
  //         ip === '::1' ||
  //         ip === '127.0.0.1' ||
  //         ip.startsWith('192.168') ||
  //         ip.startsWith('10.') ||
  //         ip.startsWith('172.')
  //       ) {
  //         // For development fallback only, NOT in production
  //         if (process.env.NODE_ENV !== 'production') {
  //           ip = '8.8.8.8';
  //         }
  //       }

  //       const sessionId = uuidv4();
  //       const userAgent = req.headers['user-agent'];
  //       const parser = new UAParser(userAgent);
  //       const parsedUA = parser.getResult();
  //       ///////////////////////////////////////////////////////////////////////////////////

  //         const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
  //         const data = geo.data;
  //         const geoLocation = `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;

  //         const session = await this.sessionModel.create({
  //           userId: new_user._id,
  //           sessionId,
  //           ipAddress: ip,
  //           userAgent, // raw user-agent string
  //           device: parsedUA.device.model || 'Unknown device',
  //           browser: parsedUA.browser.name || 'Unknown browser',
  //           os: parsedUA.os.name || 'Unknown OS',
  //           location: geoLocation,
  //           // location: (optional, set below if you use geo-IP),
  //         });
  //         ///////////////////////////////////////////////////////////////////////////////
  //         // 🔻 Delete older sessions beyond the most recent 5
  //         await this.sessionModel.deleteMany({
  //           userId: new_user._id,
  //           _id: {
  //             $nin: await this.sessionModel
  //               .find({ userId: new_user._id })
  //               .sort({ createdAt: -1 }) // latest first
  //               .limit(5)
  //               .select('_id')
  //               .then((docs) => docs.map((d) => d._id)),
  //           },
  //         });
  //         const token = await this.jwtService.sign({
  //           id: (await new_user)._id,
  //           sessionId,
  //           name: (await new_user).name,
  //           profile: (await new_user).profile,
  //           role: (await new_user).role,
  //         }); //
  //         return {
  //           token,
  //           msg: `Hey ${new_user.name}, Welcome, your registration process is accepted by our platform`,
  //         };
  //         //{ token, message: `Hey ${userName}, Welcome To My Plateform` }
  //       } catch (error) {

  //       }
  //     }
  //   }

  async loginInfo(
    userDto: CreateUserDto,
    req,
  ): Promise<{ token: string; message: string }> {
    const { email, password, location } = userDto;
    const { lat, lon } = location || {}; // Destructure location if it exists
    const loginInfo = await this.userModel
      .findOne({ email })
      .select('+password');

    if (!loginInfo) {
      throw new NotFoundException('User not found!');
    }

    const check_password = await bcrypt.compare(password, loginInfo.password);
    if (!check_password) {
      throw new UnauthorizedException('Invalid password!');
    }

    
    ////////////////////////////////////////////////////////////////////////
    // Inside your method
    let ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || // most reliable
    req.socket?.remoteAddress || // fallback
    req.ip; // fallback
    
    if (ip?.startsWith('::ffff:')) {
      ip = ip.replace('::ffff:', '');
    }
    
    if (
      ip === '::1' ||
      ip === '127.0.0.1' ||
      ip.startsWith('192.168') ||
      ip.startsWith('10.') ||
      ip.startsWith('172.')
    ) {
      // For development fallback only, NOT in production
      if (process.env.NODE_ENV !== 'production') {
        ip = '8.8.8.8';
      }
    }
    
    const sessionId = uuidv4();
    const userAgent = req.headers['user-agent'];
    const parser = new UAParser(userAgent);
    const parsedUA = parser.getResult();
    // Get location from IP
    try {
      const geo = await axios.get(`https://ipapi.co/${ip}/json/`);
      const data = geo.data;
      const geoLocation = `${data.city || 'Unknown'}, ${data.region || 'Unknown'}, ${data.country_name || 'Unknown'}`;
      
      //If geolocation (lat, lon) is provided, update the user's location


      if (lat && lon) {
        loginInfo.location = {
          type: 'Point',
          coordinates: [data.longitude, data.latitude], // MongoDB expects [longitude, latitude]
        };
        await loginInfo.save(); // Save the updated location
      }


      await this.sessionModel.create({
        userId: loginInfo._id,
        sessionId,
        ipAddress: ip,
        userAgent, // raw user-agent string
        device: parsedUA.device.model || 'Unknown device',
        browser: parsedUA.browser.name || 'Unknown browser',
        os: parsedUA.os.name || 'Unknown OS',
        location: geoLocation,
        // location: (optional, set below if you use geo-IP),
      });

      // 🔻 Delete older sessions beyond the most recent 5
      await this.sessionModel.deleteMany({
        userId: loginInfo._id,
        _id: {
          $nin: await this.sessionModel
            .find({ userId: loginInfo._id })
            .sort({ createdAt: -1 }) // latest first
            .limit(5)
            .select('_id')
            .then((docs) => docs.map((d) => d._id)),
        },
      });

      //////////////////////////////////////////////////////////////////////

      // Create JWT token
      const token = await this.jwtService.sign({
        id: loginInfo._id,
        sessionId,
        name: loginInfo.name,
        profile: loginInfo.profile,
        role: loginInfo.role,
      });
      return { token, message: 'User login success' };
    } catch (error) {
      console.log(error);
    }
  }

  async shortLinkGenerator(req) {
    // console.log(req.user._id.toString())
    const myInfo = await this.userModel.findById(req.user._id);
    const isExist = myInfo.shortLink;
    if (isExist) {
      return isExist;
    } else {
      const shortLink = nanoid(12);
      const generatedLink = {
        shortId: shortLink,
        fullUrl: req.user._id.toString(),
      };
      myInfo.shortLink = generatedLink;
      await myInfo.save();
      return generatedLink;
    }
  }

  async checkShortLink(req) {
    const myInfo = await this.userModel.findById(req.user._id);
    const isExist = myInfo.shortLink;
    if (isExist) {
      return isExist.fullUrl;
    }
  }
  //===================================

  async findNearbyUsers(id) {
    // Step 1: Get all accepted and pending friend requests
    const friendRequests = await this.friendRequestModel
      .find({
        $or: [{ requester: id }, { recipient: id }],
        status: { $in: ['accepted', 'pending'] }, // ✅ Get only accepted and pending requests
      })
      .select('requester recipient')
      .lean();

    // Step 2: Extract the user IDs from friend requests
    const excludedUserIds = friendRequests.flatMap((req) => [
      req.requester.toString(),
      req.recipient.toString(),
    ]);

    // Remove the logged-in user ID (since we don't need to exclude themselves)
    const filteredExcludedUserIds = excludedUserIds.filter(
      (uid) => uid !== id.toString(),
    );

    const currentUser = await this.userModel.findById(id);

    if (!currentUser) {
      throw new Error('User not found');
    }

    const coordinates = currentUser?.location?.coordinates;

    if (!coordinates || coordinates.length !== 2) {
      throw new Error('Invalid location data');
    }

    // Step 3: Fetch nearby users but exclude the ones in `filteredExcludedUserIds`
    const nearbyUsers = await this.userModel
      .find({
        _id: { $nin: filteredExcludedUserIds, $ne: id }, // ✅ Exclude friends and current user
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates,
            },
            $maxDistance: 914000, // 50 km
          },
        },
      })
      .select(
        '-balance -email -createdAt -updatedAt -role -otp -totalCountQuestionsId -location -totalCountQuestions -blockedUsers -description',
      )
      .limit(50)
      .exec();
    return nearbyUsers;
  }

  //====================================
  async findSingleUser(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid User!', 404);
    return await this.userModel.findById(
      { _id: id },
      { totalCountQuestionsId: 0 },
    );
  }
  //====================================
  async getBio(id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid User!', 404);
    return await this.userModel
      .findById({ _id: id })
      .select({ name: 1, title: 1, email: 1, description: 1, _id: 0 });
  }
  //================================
  async findSingleUserByPublic(user) {
    let option = {};
    if (user) {
      option = {
        $or: [
          { name: new RegExp(user.toLowerCase(), 'i') },
          { email: new RegExp(user.toLowerCase(), 'i') },
          { title: new RegExp(user.toLowerCase(), 'i') },
        ],
      };
    }

    const data = this.userModel.find(option);

    return data;
  }

  async findSingleUserByPublicUser(param) {
    // const result = await this.userModel.findById({ _id: param }).select('name profile title status description');
    const result = await this.userModel.findById({ _id: param });
    return result; //
  }
  async getHalfUserData(param) {
    const result = await this.userModel
      .findById({ _id: param })
      .select('name profile title description status');
    return result; //
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  //==================
  async updateAuthinticUserProfile(user: any, profile: any) {
    cloudinary.config({
      cloud_name: this.ConfigService.get('cloud_name'),
      api_key: this.ConfigService.get('Api_key'),
      api_secret: this.ConfigService.get('Api_secret'),
    });

    let url = '';
    try {
      if (profile) {
        const devide = user.profile.split('/');
        const lastPart = devide[devide.length - 1];
        const finalPart = lastPart.split('.')[0];
        await cloudinary.uploader.destroy(`mcq_reader_profile/${finalPart}`);
        const data = await cloudinary.uploader.upload(profile.file.path, {
          folder: 'mcq_reader_profile',
          public_id: `${Date.now()}`,
          resource_type: 'auto',
        });
        url = data.url;
      } else {
        url = user.profile;
      }
      await this.userModel.findByIdAndUpdate(
        { _id: new mongoose.mongo.ObjectId(user.id) },
        {
          profile: url,
        },
      );
      return url;
    } catch (error) {
      console.log(error);
    }
  } //

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  mcq_reader_profile;
  //find all register user
  async findMyProfile(emailObj) {
    const { email } = emailObj;
    const me = await this.userModel.findOne({ email });
    return { profile: me.profile, name: me.name };
  }

  async requestedAuthData(user, req) {
    const id = req.user._id;
    if (user.key == 'name') {
      await this.userModel.findByIdAndUpdate(
        id,
        { name: user.value },
        { new: true },
      );
    } else if (user.key == 'title') {
      await this.userModel.findByIdAndUpdate(
        id,
        { title: user.value },
        { new: true },
      );
    } else if (user.key == 'desc') {
      await this.userModel.findByIdAndUpdate(
        id,
        { description: user.value },
        { new: true },
      );
    } else if (user.key == 'link') {
      await this.userModel.findByIdAndUpdate(
        id,
        { fblink: user.value },
        { new: true },
      );
    }
    //   if (user.key == 'level') {
    //    await this.userModel.findByIdAndUpdate(id,{status:user.value},{new:true})
    //   //  await this.userModel.findByIdAndUpdate(id,{balance:previousBalance + },{new:true})
    //  }////
  }
  //=================addLevel================
  async addLevel(user) {
    const id = user.id;
    const status = user.status;
    //==============================================
    const bangla_r = user?.totalCountQuestions[0]?.rightAns;
    const bangla_w = user?.totalCountQuestions[0]?.wrongAns;
    const english_r = user?.totalCountQuestions[1]?.rightAns;
    const english_w = user?.totalCountQuestions[1]?.wrongAns;
    const totalReadQuestions = bangla_r + bangla_w + english_r + english_w;
    const percentise = Math.floor(
      ((bangla_r + english_r) / totalReadQuestions) * 100,
    );
    //===========================================================================
    //===========================================================================
    const value = totalReadQuestions;
    const p = percentise;
    if (value >= 900 && value < 3600 && p > 60) {
      status == 'Level One'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level One' },
            { new: true },
          );
    }
    if (value >= 3600 && value < 12100 && p > 60) {
      status == 'Level Two'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Two' },
            { new: true },
          );
    }
    if (value >= 12100 && value < 32400 && p > 60) {
      status == 'Level Three'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Three' },
            { new: true },
          );
    }
    if (value >= 32400 && value < 64800 && p > 60) {
      status == 'Level Four'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Four' },
            { new: true },
          );
    }
    if (value >= 64800 && value < 144400 && p > 60) {
      status == 'Level Five'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Five' },
            { new: true },
          );
    }
    if (value >= 144400 && value < 260100 && p > 60) {
      status == 'Level Six'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Six' },
            { new: true },
          );
    }
    if (value >= 260100 && value < 435600 && p > 60) {
      status == 'Level Seven'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Seven' },
            { new: true },
          );
    }
    if (value >= 435600 && value < 688900 && p > 60) {
      status == 'Level Eight'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Eight' },
            { new: true },
          );
    }
    if (value >= 688900 && value < 1000000 && p > 60) {
      status == 'Level Nine'
        ? null
        : await this.userModel.findByIdAndUpdate(
            id,
            { status: 'Level Nine' },
            { new: true },
          );
    }
  }

  //===============addBalance================
  async addBalance(user) {
    const id = user._id;
    const dynamicBalance = 0.005;
    if (!id) {
      throw new UnauthorizedException('User id not found');
    } else {
      await this.userModel.findByIdAndUpdate(
        id,
        { $inc: { balance: dynamicBalance } },
        { new: true },
      );
    }
  }

  //========profile update==============
  async userProfile(id) {
    // const user = await this.userModel.findById(id)
    // console.log()
    // return user.profile;
    const user = await this.userModel.findById(id, { profile: 1, _id: 0 }); // Fetch only the 'profile' field
    return user.profile; // Ensure proper handling if the user is not found
  }
  //========profile update==============
  async profile() {
    return 'Profile Update Done';
  }

  async sendMail(email: string): Promise<{ msg: string }> {
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Email does not exist!');
    }

    const firstName = user.name?.split(' ')[0] || 'User';
    const mailOptions = {
      from: '"BCS Prep" <toriquldev000@gmail.com>',
      to: email,
      subject: 'Password Reset Code - BCS Prep',
      html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
        <div style="text-align: right;">
          <img src="${user.profile}" alt="bcs logo" style="width: 60px; border-radius: 50%; border: 1px solid rgb(211, 210, 210);">
        </div>
        <h2 style="color: #333;">Hello, ${firstName}</h2>
        <p style="font-size: 16px; color: #555;">
          We received a request to change password for your account. Use the following code to confirm your request:
        </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; background: #f1f1f1; border: 1px dashed gray; color: gray; padding: 10px 20px; font-size: 18px; font-weight: bold; border-radius: 8px;">
              ${otp}
            </span>
          </div>
        <p style="font-size: 14px; color: #888;">If you didn’t request this, you can safely ignore this email.</p>
        <p style="font-weight: bold; color: #444;">Thank you,<br/>BCS Prep Team</p>
      </div>
    </div>
    `,
    };
     await this.mailService.sendMail(mailOptions)

    await this.userModel.findByIdAndUpdate(user._id, { otp }, { new: true });

    return { msg: 'Check your email box' };
  }

  async sendMailForChangeEmail(email: string): Promise<number> {
    const otp = Math.floor(1000 + Math.random() * 9000); // 4-digit OTP
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Email does not exist!');
    }

    const fullName = user.name.split(' ');
    const firstName = fullName[0];
    
    const mailOptions = {
      from: '"Eduplusplus" <toriquldev000@gmail.com>',
      to: email,
      subject: 'Email Change Request - BCS Prep',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
        <div style="text-align: right;">
          <img src="${user.profile}" alt="bcs logo" style="width: 60px; border-radius: 50%; border: 1px solid rgb(211, 210, 210);">
        </div>
        <h2 style="color: #333;">Hello, ${firstName}</h2>
        <p style="font-size: 16px; color: #555;">
          We received a request to change the email address for your account. Use the following code to confirm your request:
        </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="display: inline-block; background: #f1f1f1; border: 1px dashed gray; color: gray; padding: 10px 20px; font-size: 18px; font-weight: bold; border-radius: 8px;">
              ${otp}
            </span>
          </div>
        <p style="font-size: 14px; color: #888;">If you didn’t request this, you can safely ignore this email.</p>
        <p style="font-weight: bold; color: #444;">Thank you,<br/>BCS Prep Team</p>
      </div>
    </div>
    `,
    };

    // Await email sending properly
    await this.mailService.sendMail(mailOptions)
    return otp;
  }

  async verifyPass(id, password) {
    const reader = await this.userModel
      .findOne({ _id: id })
      .select('+password');
    const check_password = await bcrypt.compare(password, reader.password);
    if (!check_password) {
      return false;
    } else return true;
  }

  async updatePass(body) {
    const { email, password } = body;
    const user = await this.userModel.findOne({ email: email });
    const strongPass = await bcrypt.hash(password, 9);
    await this.userModel.findByIdAndUpdate(
      user._id,
      { password: strongPass },
      { new: true },
    );
  }

  async updateEmail(email, id) {
    const reader = await this.userModel.findOne({ _id: id });
    reader.email = email;
    await reader.save();
  }

  async findUserForUpdatePass(user) {
    const reader = await this.userModel.findOne({ email: user.email });
    return reader;
  }

  async questionCollecton(questions, req) {
    const { _id } = req.user;
    const { status, subject, id } = questions;
    const targetUser = await this.userModel.findById(_id);

    console.log(status, subject, id);

    if (targetUser.totalCountQuestionsId.includes(id)) {
      return null;
    } else {
      ///////////////////////////////////////////////////////////////////
      targetUser?.totalCountQuestionsId.push(id);
      await targetUser.save();
      const field = status === 'right' ? 'rightAns' : 'wrongAns';
      await this.userModel.updateOne(
        { _id },
        {
          $inc: {
            [`totalCountQuestions.$[elem].${field}`]: 1,
          },
        },
        {
          arrayFilters: [{ 'elem.sub': subject }],
        },
      );
      ///////////////////////////////////////////////////////////////////
    }
  }
  /////////////////////////////Retrive all read question/////////////////////////////

  async retrieveAllReadQuestion(
    id: string,
    type: string,
    page: number,
    limit: number,
  ) {
    const targetUser = await this.userModel
      .findById(id)
      .populate({
        path: 'totalCountQuestionsId',
        select:
          '_id userId slug userName userProfile prevExam question option_01 option_02 option_03 option_04 rightAns content likes comments createdAt subject chapter',
        model: 'UsersQuestion',
      })
      .lean(); // Convert Mongoose document to a plain JavaScript object

    if (!targetUser) return { message: 'User not found' };

    // Ensure totalCountQuestionsId is an array
    const questions: any[] = targetUser.totalCountQuestionsId || [];

    // Filter by subject type
    const filteredQuestions = questions
      .filter((q) => q.subject === type)
      .map((q) => ({
        ...q,
        totalComments: q.comments?.length || 0, // Add totalComments field
      }));

    // Pagination logic
    const startIndex = (page - 1) * limit;
    const result = filteredQuestions.slice(startIndex, startIndex + limit);

    return result.reverse();
  }

  //////////////////////////////////////////////////////Here is the logic to block and unblock users/////////////////////////////////////////////
  async blockUser(authId: string, targetId: string) {
    const isExist = await this.userModel.findById(authId);
    if (!isExist) throw new NotFoundException('User not found');
    if (!isExist.blockedUsers.includes(targetId)) {
      isExist.blockedUsers.push(targetId);
      await isExist.save();
    }
    return 'User blocked successfully';
  }

  async unBlockUser(authId: string, targetId: string) {
    const isExist = await this.userModel.findById(authId);
    if (!isExist) throw new NotFoundException('User not found');

    isExist.blockedUsers = isExist.blockedUsers.filter(
      (id) => id.toString() !== targetId,
    ); // Ensure proper type comparison
    await isExist.save();

    return 'User unblocked successfully';
  }

  async isBlockUser(authId: string, targetId: string) {
    const isExist = await this.userModel.findById(authId);
    if (!isExist) throw new NotFoundException('User not found');
    return isExist.blockedUsers.includes(targetId);
  }
  async isBlockedMe(authId: string, targetId: string) {
    const isExist = await this.userModel.findById(targetId);
    if (!isExist) throw new NotFoundException('User not found');
    return isExist.blockedUsers.includes(authId);
  }

  //==========================================================================================================-
  async userProfileAndName(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }

    return await this.userModel
      .findById(id)
      .select(
        '-password -totalCountQuestions -totalCountQuestionsId -balance -email',
      );
  }

  async multipleUsersProfile(ids: string[]): Promise<string[]> {
    const profiles = await this.userModel
      .find({ _id: { $in: ids } })
      .select('profile')
      .lean();

    return profiles.map((user) => user.profile);
  }

  //===========================================================================================================
  //=========================== SERVICE FOR OTHTER MODULE AND CONTROLLER ======================================
  //===========================================================================================================
  async findAllUserForRequestedFriend(allId) {
    // console.log(allId)
    const user = await this.userModel
      .find({ _id: allId })
      .sort({ createdAt: -1 });
    return user;
  }

  async updateUserOnlineStatus(id, bool) {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { isOnline: bool },
    );
  }

  /////////////////////////// Here is mutual friend related query ///////////////////////
  async suggestedFriends(req) {
    const currentUserId = req.user._id.toString();

    // 1. Get all accepted friend requests of current user
    const friendRequests = await this.friendRequestModel
      .find({
        status: 'accepted',
        $or: [{ requester: currentUserId }, { recipient: currentUserId }],
      })
      .sort({ createdAt: -1 }) // ✅ Proper sorting
      .select('requester recipient createdAt') // optional: include createdAt
      .lean();
    // 2. Extract direct friends' IDs
    const directFriendIds = [
      ...new Set(
        friendRequests
          .flatMap(({ requester, recipient }) => [
            requester.toString(),
            recipient.toString(),
          ])
          .filter((id) => id !== currentUserId),
      ),
    ];

    // 3. Get recent connections of all direct friends (second-degree)
    const objectIds = directFriendIds.map((id) => new Types.ObjectId(id));

    const allFriendConnections = await this.friendRequestModel.aggregate([
      {
        $match: {
          status: 'accepted',
          $or: [
            { requester: { $in: objectIds } },
            { recipient: { $in: objectIds } },
          ],
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 100 },
      { $sample: { size: 20 } },
      {
        $project: {
          _id: 1,
          requester: 1,
          recipient: 1,
          createdAt: 1,
        },
      },
    ]);

    // 4. Build mutual friend map with IDs
    const mutualFriendCounts: Record<string, number> = {};
    const mutualFriendIdsMap: Record<string, Set<string>> = {}; // new
    for (const conn of allFriendConnections) {
      const [userA, userB] = [
        conn.requester.toString(),
        conn.recipient.toString(),
      ];

      const isUserAFriend = directFriendIds.includes(userA);
      const isUserBFriend = directFriendIds.includes(userB);

      // If both are not direct friends, skip
      if (!isUserAFriend && !isUserBFriend) continue;

      // Find the friend (mutual) and the candidate (non-direct-friend)
      const mutualFriend = isUserAFriend ? userA : userB;
      const friendCandidate = isUserAFriend ? userB : userA;

      // Skip if candidate is current user or already a friend
      if (
        friendCandidate === currentUserId ||
        directFriendIds.includes(friendCandidate)
      )
        continue;

      // Count and track mutual friend
      mutualFriendCounts[friendCandidate] =
        (mutualFriendCounts[friendCandidate] || 0) + 1;

      if (!mutualFriendIdsMap[friendCandidate]) {
        mutualFriendIdsMap[friendCandidate] = new Set();
      }
      mutualFriendIdsMap[friendCandidate].add(mutualFriend);
    }

    // 5. Get all pending friend requests sent by current user
    const pendingSentRequests = await this.friendRequestModel
      .find({
        requester: currentUserId,
        status: 'pending',
      })
      .select('recipient')
      .lean();

    const pendingRecipientIds = new Set(
      pendingSentRequests.map((r) => r.recipient.toString()),
    );

    // 6. Filter users who have at least 2 mutual friends and are not in pending requests
    const suggestedUserIds = Object.entries(mutualFriendCounts)
      .filter(([id, count]) => count >= 1 && !pendingRecipientIds.has(id))
      .map(([id]) => new Types.ObjectId(id));

    // 7. Optional: Populate user data from Users collection (e.g., Reader)
    const suggestedUsers = await this.userModel
      .find({ _id: { $in: suggestedUserIds } })
      .select('_id name profile') // select what you need
      .lean();

    const res = suggestedUsers.map((user) => {
      const id = user._id.toString();
      return {
        ...user,
        mutualFriends: mutualFriendCounts[id] || 0,
        mutualFriendIds: Array.from(mutualFriendIdsMap[id] || []),
      };
    });
    res.reverse();
    return await res;
  }

  async currentFriends(req) {
    const currentUserId = req.user._id.toString();
    // 1. Get all accepted friend requests of current user
    const friendRequests = await this.friendRequestModel
      .find({
        status: 'accepted',
        $or: [{ requester: currentUserId }, { recipient: currentUserId }],
      })
      .select('requester recipient')
      .lean();

    // 2. Extract direct friends' IDs
    const directFriendIds = [
      ...new Set(
        friendRequests
          .flatMap(({ requester, recipient }) => [
            requester.toString(),
            recipient.toString(),
          ])
          .filter((id) => id !== currentUserId),
      ),
    ];
    return directFriendIds;
  }
}
