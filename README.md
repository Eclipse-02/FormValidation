# Form Validation

## Informasi Mahasiswa

- Nama : Rafa Umar Abdus Syakur
- NIM : 2410501045

## Deskripsi Aplikasi

Form Validation adalah aplikasi mobile berbasis React Native yang mengimplementasikan validasi form modern pada proses autentikasi pengguna dengan menggunakan `formik` dan `yup`.

Aplikasi ini menampilkan halaman **Login** dan **Register** dengan validasi input yang responsif, seperti pengecekan format email, panjang password, field wajib diisi, serta konfirmasi password.
Struktur aplikasi dipisahkan menggunakan folder `components`, `screens`, dan `utils` agar kode lebih modular, reusable, dan mudah dikembangkan.

Selain itu, aplikasi juga menerapkan UX yang baik melalui tampilan pesan error secara langsung, perubahan border input ketika terjadi kesalahan, serta navigasi antar halaman autentikasi yang intuitif.

## Fitur yang Diimplementasikan

- Form Login dan Register menggunakan validasi input.
- Validasi email dengan format yang benar.
- Validasi password minimum karakter.
- Validasi confirm password agar sama dengan password utama.
- Menampilkan pesan error pada setiap field yang tidak valid.
- Border input berubah warna menjadi merah ketika validasi gagal.
- Menggunakan komponen input reusable.
- Navigasi antar halaman Login dan Register.
- Mendukung UX mobile yang lebih baik dengan keyboard handling.
- Validasi dipicu saat field kehilangan fokus (`onBlur`) untuk mengurangi validasi berlebihan.

## Screenshot

### Halaman Register (Step 1)
<p align="center">
  <img width="250" alt="register1" src="https://github.com/user-attachments/assets/02c17399-c1fa-47b7-bcc1-f42d0d9a775a" />
</p>

### Halaman Register (Step 2)
<p align="center">
  <img width="250" alt="register2" src="https://github.com/user-attachments/assets/f8a69d39-ab01-4d0f-9b79-36ebb92a47d1" />
</p>

### Halaman Register (Step 3)
<p align="center">
  <img width="250" alt="register3" src="https://github.com/user-attachments/assets/23e8949d-ef41-4b3f-9bb2-0523ec2d3826" />
</p>

### Halaman Login
<p align="center">
  <img width="250" alt="login" src="https://github.com/user-attachments/assets/275ccc40-45d6-4883-84fe-bedcdf40b882" />
</p>

### Login Sukses
<p align="center">
  <img width="250" alt="success" src="https://github.com/user-attachments/assets/6e6a9118-2c9a-4279-8570-658cc70afb4d" />
</p>

## Cara Menjalankan

```bash
npm install && npx expo start
```
