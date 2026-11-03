# Pokémon Zenith Story Manager

Website quản lý cốt truyện cho game Pokémon Zenith, thiết kế để chạy trên **GitHub Pages**. Không cần Node.js, hosting server, database hoặc API key.

## Tính năng

- Dashboard: tổng quan chương, cảnh, tiến độ thực hiện.
- Chapters: quản lý cấu trúc truyện theo chương.
- Scenes: viết cảnh và hội thoại, tạo đoạn dẫn và lựa chọn; xem thử hội thoại.
- Characters: hồ sơ, động lực, tuyến nhân vật và liên kết với Scene.
- Quests: nhiệm vụ chính/phụ, mục tiêu, phần thưởng và điều kiện mở.
- Locations: địa điểm và Map ID.
- Switch / Variable: danh sách cờ truyện và số Scene tham chiếu.
- Story Flow: sơ đồ kết nối các Scene tiền đề.
- Tìm kiếm toàn cục (`Ctrl+K`), giao diện sáng/tối.
- Tự lưu trong trình duyệt và xuất/nhập JSON, xuất tài liệu Markdown.

## Cách đưa lên GitHub Pages

1. Tạo một repository trên GitHub, ví dụ `zenith-story-manager`.
2. Upload **các file trong thư mục này** vào thư mục gốc của nhánh `main`: `index.html`, `styles.css`, `app.js`, `favicon.svg`, `.nojekyll`, `README.md`.
3. Trong repository, chọn **Settings → Pages → Build and deployment**.
4. Chọn **Deploy from a branch**, Branch `main`, Folder `/(root)` và **Save**.
5. Website sẽ có địa chỉ dạng `https://TEN-TAI-KHOAN.github.io/zenith-story-manager/`.

Có thể thử bằng cách mở file `index.html` trực tiếp trong Chrome/Edge. Không cần chạy lệnh build.

## Quản lý dữ liệu

**Quan trọng:** GitHub Pages là hosting tĩnh. Website hiện lưu dữ liệu bằng `localStorage` trong trình duyệt (theo domain). Không có cơ chế tự đồng bộ dữ liệu với GitHub hoặc giữa các máy tính.

Để sao lưu: chọn biểu tượng **Cài đặt / Dữ liệu** trên thanh trên → **Tải JSON**. Nên thêm file sao lưu vào một thư mục riêng của repository hoặc lưu trên ổ cứng/cloud. Để khôi phục: **Chọn file → Import JSON**.

Khi mới mở có dữ liệu minh họa 3 chương. Chọn **Bắt đầu trống** để xóa ví dụ và tạo một dự án mới. Tính năng này không thể phục hồi nếu chưa sao lưu.

## Cấu trúc

- `index.html`: điểm vào website.
- `styles.css`: toàn bộ theme và responsive layout.
- `app.js`: ứng dụng, các tính năng, dữ liệu mẫu và logic.
- `favicon.svg`: biểu tượng tab.
- `.nojekyll`: tắt xử lý Jekyll mặc định trên GitHub Pages.

## Ghi chú kỹ thuật

- Không tự chỉnh Event/PBS trong game. Trường Map ID, Event ID, Conditions/Effects là tài liệu để đối chiếu với RPG Maker XP.
- Mỗi Scene lưu danh sách Scene tiền đề, được dùng để vẽ đường kết nối ở Story Flow.
- HTML của dữ liệu người dùng được escape trước khi hiển thị. Không phụ thuộc các thư viện JavaScript bên ngoài.
- Font dùng Google Fonts nếu có kết nối mạng, và tự chuyển sang system fonts nếu không thể tải.
