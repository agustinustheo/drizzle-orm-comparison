CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`email` varchar(256)
);

CREATE UNIQUE INDEX `email_idx` ON `users` (`email`);