-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2017 a las 18:02:21
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pharmacycompany`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`) VALUES
(2, 'changed', 10),
(4, 'Product3', 40),
(7, 'mavenrulez', 75),
(11, 'awesomeproduct', 95);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchases`
--

CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idProduct` int(11) NOT NULL,
  `deliveryDate` date NOT NULL,
  `spcecialRequests` text NOT NULL,
  `specialInstructions` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `purchases`
--

INSERT INTO `purchases` (`id`, `idUser`, `idProduct`, `deliveryDate`, `spcecialRequests`, `specialInstructions`) VALUES
(1, 1, 2, '2017-05-14', 'patata', 'werwerewr'),
(2, 1, 2, '2017-05-14', 'Fragil material, must be sended in a special vehicle', 'werwerwerw'),
(3, 1, 4, '2017-05-25', 'Dlivery at the main hospital', 'qwerty'),
(4, 2, 7, '2017-06-02', 'Fragil material, must be sended in a special vehicle', 'amazing user2'),
(5, 1, 4, '2017-05-20', ':Dlivery at the main hospital:', 'special legendary'),
(6, 1, 11, '2017-05-15', ':Delivery at the main hospital:', 'awesome delivery pls');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `surname1` varchar(150) NOT NULL,
  `nick` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL,
  `address` varchar(150) NOT NULL,
  `telephone` int(11) DEFAULT NULL,
  `mail` varchar(150) NOT NULL,
  `birthDate` varchar(150) NOT NULL,
  `entryDate` varchar(150) NOT NULL,
  `dropOutDate` varchar(150) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `image` varchar(150) NOT NULL,
  `userType` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `surname1`, `nick`, `password`, `address`, `telephone`, `mail`, `birthDate`, `entryDate`, `dropOutDate`, `active`, `image`, `userType`) VALUES
(1, 'Jhon', 'Peterson', 'user1', '123456', 'Address1', 933333333, 'r1@r.com', '1975-01-01', '2014-01-01', '0000-00-00', 1, 'images/usersImages/user1.jpg', 1),
(2, 'Jhon1', 'Peterson1', 'user2', '123456', 'Address2', 933333333, 'r2@r.com', '1975-01-01', '2014-01-01', '0000-00-00', 1, 'images/usersImages/user2.jpg', 1),
(3, 'Jhon2', 'Peterson2', 'admin1', '123456', 'Address3', 933333333, 'r3@r.com', '1975-01-01', '2014-01-01', '0000-00-00', 1, 'images/usersImages/user3.jpg', 0),
(4, 'Jhon3', 'Peterson3', 'admin2', '123456', 'Address4', 933333333, 'r4@r.com', '1975-01-01', '2014-01-01', '0000-00-00', 1, 'images/usersImages/user4.jpg', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idUser` (`idUser`,`idProduct`),
  ADD KEY `fk_idProduct` (`idProduct`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `purchases`
--
ALTER TABLE `purchases`
  ADD CONSTRAINT `fk_idProduct` FOREIGN KEY (`idProduct`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fk_idUser` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
