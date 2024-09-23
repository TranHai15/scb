const connectDatabase = require("../db");

class User {
  constructor() {
    this.connection = null;
  }

  // Kết nối với cơ sở dữ liệu khi tạo đối tượng User
  async connect() {
    if (!this.connection) {
      this.connection = await connectDatabase();
      console.log("Database connected");
    }
  }

  // Đóng kết nối với cơ sở dữ liệu
  async closeConnection() {
    if (this.connection) {
      await this.connection.end();
      this.connection = null;
      console.log("Database connection closed");
    }
  }
  // Tạo hàm thêm dữ liệu vào database
  static async insertUser(
    name,
    email,
    password,
    provider = "email",
    isAdmin = false
  ) {
    const user = new User();
    await user.connect();

    const insert = `INSERT INTO user (name, email, password, provider, is_admin) VALUES (?, ?, ?, ?, ?)`;

    try {
      const [result] = await user.connection.execute(insert, [
        name,
        email,
        password,
        provider,
        isAdmin,
      ]);
      console.log("User added:", result.insertId);
      return result.insertId; // Trả về ID của người dùng đã thêm
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    } finally {
      await user.closeConnection(); // Đóng kết nối
    }
  }

  // Kiểm tra xem đã tồn tại email chưa
  static async checkEmailExists(email, data = false) {
    const user = new User();
    await user.connect();

    const query = `SELECT * FROM user WHERE email = ?`;

    try {
      const [rows] = await user.connection.execute(query, [email]);
      if (!data) {
        return rows.length > 0; // Nếu có bản ghi, trả về true
      } else {
        return rows[0]; // Trả về bản ghi đầu tiên nếu có dữ liệu
      }
    } catch (error) {
      console.error("Error checking email:", error);
      throw error;
    } finally {
      await user.closeConnection(); // Đóng kết nối
    }
  }

  // Lấy toàn bộ người dùng
  static async getUsers() {
    const user = new User();
    await user.connect();

    const query = `SELECT * FROM user`;

    try {
      const [rows] = await user.connection.execute(query);
      return rows; // Trả về tất cả người dùng
    } catch (error) {
      console.error("Khong lay duoc du lieu nguoi dung:", error);
      throw error;
    } finally {
      await user.closeConnection(); // Đóng kết nối
    }
  }

  // ham xoa nguoi dung
  static async delete(id) {
    const user = new User();
    await user.connect();

    const query = `DELETE FROM user WHERE id=?`;

    try {
      const [result] = await user.connection.execute(query, [id]); // Thực hiện truy vấn
      return result.affectedRows; // Trả về số bản ghi đã xóa
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
      throw error;
    } finally {
      await user.closeConnection(); // Đóng kết nối
    }
  }
}

module.exports = User;
