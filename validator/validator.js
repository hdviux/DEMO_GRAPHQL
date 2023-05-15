const User = require("../models/User");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const userNameFormat = /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/;
const passwordFormat = /^[a-zA-Z0-9!@#$%^&*]{5,15}$/;

// const bookValidator = {
//   checkAuthorID: async (data) => {
//     if (ObjectId.isValid(data.authorId) === true) {
//       const result = await Author.findOne({ _id: data.authorId });
//       if (!result) throw new Error("AuthorId không tồn tại!");
//     } else {
//       throw new Error("AuthorId không hợp lệ!");
//     }
//   },
// };

const userValidator = {
  checksignup: async (data) => {
    let errors = [];
    if (!data.userName.match(userNameFormat))
      errors.push({
        userName: "userName từ 6-16 ký tự và không chưa kí tự đặc biệt",
      });
    if (!data.email.match(emailFormat))
      errors.push({
        email: "Sai định dạng mail",
      });
    if (!data.phone.match(phoneFormat))
      errors.push({
        phone: "Chưa đúng phone",
      });
    if (!data.password.match(passwordFormat))
      errors.push({
        password: "password từ 6-16 ký tự",
      });
    if (!data.gender)
      errors.push({
        gender: "Chưa có gender",
      });
    if (!data.birthday)
      errors.push({
        birthday: "Chưa có birthday",
      });
    const result = await User.findOne({ phone: data.phone });
    if (result)
      errors.push({
        phone: "Số điện thoại đã được sử dụng",
      });
    if (errors.length !== 0) {
      throw new Error(JSON.stringify(errors));
    }
  },
  checksignupphone: async (data) => {
    const result = await User.findOne({ phone: data.phone });
    if (result)
      throw new Error(
        JSON.stringify({
          phone: "Số điện thoại đã được sử dụng",
        })
      );
  },
  checklogin: async (data) => {
    if (!data.password.match(passwordFormat))
      throw new Error(
        JSON.stringify({
          password: "password từ 6-16 ký tự",
        })
      );
  },
  checkloginaccount: async (data) => {
    if (!data.phone && !data.email)
      throw new Error(
        JSON.stringify({
          account: "Chưa nhập Email/phone",
        })
      );
    const result = await User.findOne({
      $or: [{ phone: data.phone }, { email: data.email }],
    });
    if (!result) {
      throw new Error(
        JSON.stringify({
          account: "Không tìm thấy tài khoản",
        })
      );
    } else {
      return result;
    }
  },
};

module.exports = { userValidator };
