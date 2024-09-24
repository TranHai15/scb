// # Mô hình dữ liệu nhận từ AI
const connectDatabase = require("../db");

class MachDien {
  constructor() {
    this.connection = null;
  }

  // Kết nối với cơ sở dữ liệu khi tạo đối tượng MachDien
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

  // Thêm một mạch điện mới
  static async insertMach(anh_mach, so_loi, bao_cao, id_nguoi_dung) {
    const machDien = new MachDien();
    await machDien.connect();

    const insert = `
      INSERT INTO mach_dien (anh_mach, so_loi, bao_cao, id)
      VALUES (?, ?, ?, ?)
    `;

    try {
      const [result] = await machDien.connection.execute(insert, [
        anh_mach,
        so_loi,
        bao_cao,
        id_nguoi_dung,
      ]);
      console.log("Mach added:", result.insertId);
      return result.insertId;
    } catch (error) {
      console.error("Error inserting mach:", error);
      throw error;
    } finally {
      await machDien.closeConnection();
    }
  }

  // Lấy tất cả các mạch điện của người dùng
  static async getMachByUserId(id_nguoi_dung) {
    const machDien = new MachDien();
    await machDien.connect();

    const query = `SELECT * FROM mach_dien WHERE id = ?`;

    try {
      const [rows] = await machDien.connection.execute(query, [id_nguoi_dung]);
      return rows;
    } catch (error) {
      console.error("Error fetching mach by user:", error);
      throw error;
    } finally {
      await machDien.closeConnection();
    }
  }

  // Lấy chi tiết một mạch điện dựa trên id_mach và id_nguoi_dung
  static async getMachById(id_mach, id_nguoi_dung) {
    const machDien = new MachDien();
    await machDien.connect();

    const query = `SELECT * FROM mach_dien WHERE id_mach = ? AND id = ?`;

    try {
      const [rows] = await machDien.connection.execute(query, [
        id_mach,
        id_nguoi_dung,
      ]);
      return rows[0]; // Trả về bản ghi đầu tiên
    } catch (error) {
      console.error("Error fetching mach by id:", error);
      throw error;
    } finally {
      await machDien.closeConnection();
    }
  }

  // Cập nhật một mạch điện
  static async updateMach(id_mach, id_nguoi_dung, anh_mach, so_loi, bao_cao) {
    const machDien = new MachDien();
    await machDien.connect();

    const update = `
      UPDATE mach_dien
      SET anh_mach = ?, so_loi = ?, bao_cao = ?
      WHERE id_mach = ? AND id = ?
    `;

    try {
      const [result] = await machDien.connection.execute(update, [
        anh_mach,
        so_loi,
        bao_cao,
        id_mach,
        id_nguoi_dung,
      ]);
      return result.affectedRows > 0; // Trả về true nếu cập nhật thành công
    } catch (error) {
      console.error("Error updating mach:", error);
      throw error;
    } finally {
      await machDien.closeConnection();
    }
  }

  // Xóa một mạch điện
  static async deleteMach(id_mach, id_nguoi_dung) {
    const machDien = new MachDien();
    await machDien.connect();

    const deleteQuery = `DELETE FROM mach_dien WHERE id_mach = ? AND id = ?`;

    try {
      const [result] = await machDien.connection.execute(deleteQuery, [
        id_mach,
        id_nguoi_dung,
      ]);
      return result.affectedRows > 0; // Trả về true nếu xóa thành công
    } catch (error) {
      console.error("Error deleting mach:", error);
      throw error;
    } finally {
      await machDien.closeConnection();
    }
  }
}

module.exports = MachDien;
