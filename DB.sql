use test;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
UserID varchar(101) NOT NULL,
Password varchar(12) NOT NULL,
Permission numeric (1,0) NOT NULL,
Color varchar(10) NOT NULL,
Nickname varchar(21) ,
PRIMARY KEY (UserID)
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Board;
CREATE TABLE Board (
# BoardID tinyint(100) NOT NULL AUTO_INCREMENT,
BoardName varchar(255) NOT NULL UNIQUE,
UserID varchar(101) NOT NULL,
Rule mediumtext ,
TopArticleID bigint(255) ,
# PRIMARY KEY (BoardID),
PRIMARY KEY (BoardName),
FOREIGN KEY (UserID) REFERENCES Users (UserID) 
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Article;
CREATE TABLE Article (
	ArticleID bigint(255) NOT NULL AUTO_INCREMENT,
	AuthorID varchar(101) NOT NULL,
	Title varchar(255) NOT NULL,
	Content text ,
	Image longblob ,
	HashTag varchar(255) ,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	BlockName varchar(255) NOT NULL,
PRIMARY KEY (ArticleID),
FOREIGN KEY (AuthorID) REFERENCES Users (UserID),
FOREIGN KEY (BlockName) REFERENCES Board (BoardName) ON UPDATE CASCADE  ON DELETE CASCADE
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Report;
CREATE TABLE Report (
ArticleID bigint(255) NOT NULL,
Reason varchar(255) NOT NULL,
Times datetime DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (ArticleID, Reason),
FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID) ON DELETE CASCADE
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
	AuthorID varchar(101) NOT NULL,
	Content mediumtext NOT NULL,
	ArticleID bigint(255) NOT NULL,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	Floor int(255) NOT NULL,
	TagFloor int(255),
	PRIMARY KEY (AuthorID, Floor),
FOREIGN KEY (AuthorID) REFERENCES Users (UserID),
FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)  ON DELETE CASCADE
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS FollowHeart;
CREATE TABLE FollowHeart (
ArticleID bigint(255) NOT NULL,
UserID varchar(101) NOT NULL,
PRIMARY KEY (ArticleID, UserID),
FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)  ON DELETE CASCADE,
FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS FollowKeep;
CREATE TABLE FollowKeep (
ArticleID bigint(255) NOT NULL,
UserID varchar(101) NOT NULL,
DirName varchar(255) NOT NULL,
AddTime datetime DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (ArticleID, UserID),
FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)   ON DELETE CASCADE,
FOREIGN KEY (UserID, DirName) REFERENCES KeepDir (UserID, DirName)
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Notice;
CREATE TABLE Notice (
UserID varchar(101) NOT NULL,
Times datetime DEFAULT CURRENT_TIMESTAMP,
Content varchar(255) NOT NULL,
PRIMARY KEY (UserID, Times, Content),
FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS KeepDir;
CREATE TABLE KeepDir (
UserID varchar(101) NOT NULL,
DirName varchar(255) NOT NULL,
PRIMARY KEY (UserID, DirName),
FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;