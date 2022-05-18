-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 18 Bulan Mei 2022 pada 07.37
-- Versi server: 10.4.22-MariaDB
-- Versi PHP: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kopsyuk`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `stock` int(10) NOT NULL,
  `image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `stock`, `image`) VALUES
(5, 'Coffee Milk', 23000, 15, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652799240/kopskuy/uploads/product-1652799239161.png'),
(8, 'Ice Thai Tea', 25000, 10, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652849268/kopskuy/uploads/product-1652849267741.png'),
(9, 'Ice Lemon Tea', 12000, 10, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652849195/kopskuy/uploads/product-1652849194310.png'),
(10, 'Vanilla Milkshake', 23000, 10, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652840442/kopskuy/uploads/product-1652840439863.png'),
(11, 'Matcha Latte', 29000, 10, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652837422/kopskuy/uploads/product-1652837416642.png'),
(12, 'Choco Milkshake', 26000, 10, 'https://res.cloudinary.com/fazztrackfw5/image/upload/v1652838195/kopskuy/uploads/product-1652838192287.png');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
