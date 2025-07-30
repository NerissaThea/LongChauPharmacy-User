# 🚀 Hướng dẫn Setup Supabase cho Pharmacy System
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
## 📋 Các bước cần thực hiện:

### 1. Lấy thông tin từ Supabase Dashboard

**Truy cập:** https://supabase.com/dashboard/project/lmnqqiqanwluwewuteeq

#### 🔑 API Keys (Settings → API):
- **Project URL:** `https://lmnqqiqanwluwewuteeq.supabase.co`
- **anon/public key:** Copy từ dashboard
- **service_role key:** Copy từ dashboard (⚠️ Bảo mật cao)

#### 🗄️ Database Password (Settings → Database):
- Tìm phần **Connection string**
- Copy password hoặc reset password mới
- Lưu ý: Password này dùng để kết nối trực tiếp với PostgreSQL

### 2. Cập nhật file `.env`

Mở file `.env` và thay thế các giá trị placeholder:

```env
# Thay thế các giá trị này với thông tin thực từ Supabase Dashboard
SUPABASE_URL=https://lmnqqiqanwluwewuteeq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_PASSWORD=your_actual_database_password
```

### 3. Chạy Migration

Sau khi cập nhật `.env`, chạy các lệnh sau:

```bash
# Tạo và áp dụng migrations
python manage.py makemigrations
python manage.py migrate

# Tạo superuser (optional)
python manage.py createsuperuser

# Chạy server
python manage.py runserver
```

### 4. Kiểm tra kết nối

- Nếu thành công: Django sẽ sử dụng PostgreSQL trên Supabase
- Nếu thất bại: Django sẽ fallback về SQLite local
- Kiểm tra logs để xem database nào đang được sử dụng

## 🔧 Troubleshooting

### Lỗi kết nối database:
1. Kiểm tra password trong `.env` có đúng không
2. Đảm bảo project Supabase đang active
3. Kiểm tra network connection

### Lỗi SSL:
- Supabase yêu cầu SSL connection
- Đã được cấu hình trong `settings.py`

### Dependencies:
- Đã cài đặt: `psycopg2-binary`, `python-dotenv`, `supabase`
- Nếu thiếu: `pip install -r requirements.txt`

## 🎯 Lợi ích của Supabase:

✅ **Real-time database** - Cập nhật inventory tức thời  
✅ **Built-in Authentication** - Quản lý user dễ dàng  
✅ **File Storage** - Lưu trữ hình ảnh sản phẩm  
✅ **Auto-generated APIs** - REST & GraphQL sẵn có  
✅ **Dashboard quản lý** - Xem và chỉnh sửa data trực quan  

## 📞 Hỗ trợ:

Nếu gặp vấn đề, hãy:
1. Kiểm tra file `.env` có đúng format không
2. Xem Django logs khi chạy server
3. Kiểm tra Supabase Dashboard có báo lỗi không

---
**Lưu ý:** File `.env` đã được thêm vào `.gitignore` để bảo mật thông tin.