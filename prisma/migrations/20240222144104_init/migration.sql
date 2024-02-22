-- CreateTable
CREATE TABLE `Post` (
    `id` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` LONGTEXT NOT NULL,
    `slug` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
