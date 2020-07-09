class UserServices {
  // 멤버변수 없음 : 인자로 들어온 모델 직접 수정
  // 타입스크립트라면 private으로 해줄 수 있을듯(더 안전)
  constructor(userModel) {
    this.userModel = userModel;
  }

  getAllUser(limit) {
    return this.userModel.findAll({ limit: limit });
  }

  getUserById(id) {
    return this.userModel.findOne({ where: { id } });
  }

  createOneUser(name) {
    return this.userModel.create({ name });
  }

  deleteUserById(id) {
    return this.userModel.destroy({ where: { id } });
  }
}

module.exports = UserServices;
