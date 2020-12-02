use test;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
UserID varchar(101) NOT NULL,
Password varchar(9) NOT NULL,
Permissions numeric (1,0) NOT NULL,
Color varchar(10) NOT NULL,
Nickname varchar(21) ,
PRIMARY KEY (UserID)
) ;

DROP TABLE IF EXISTS Board;
CREATE TABLE Board (
BoardID tinyint(100) NOT NULL AUTO_INCREMENT,
BoardName varchar(255) NOT NULL,
UserID varchar(101) NOT NULL,
Rule mediumblob ,
TopArticleID bigint(255) ,
PRIMARY KEY (BoardID),
FOREIGN KEY (UserID) REFERENCES Users (UserID)
) ;

DROP TABLE IF EXISTS Article;
CREATE TABLE Article (
	ArticleID bigint(255) NOT NULL AUTO_INCREMENT,
	AuthorID varchar(101) NOT NULL,
	Title varchar(255) NOT NULL,
	Content longtext ,
	Image longtext ,
	HashTag varchar(255) ,
	Times datetime NOT NULL,
	BlockID tinyint(100) NOT NULL,
PRIMARY KEY (ArticleID),
FOREIGN KEY (AuthorID) REFERENCES Users (UserID),
FOREIGN KEY (BlockID) REFERENCES Board (BoardID)
) ;

DROP TABLE IF EXISTS Report;
CREATE TABLE Report (
ArticleID bigint(255) NOT NULL,
Reason varchar(255) NOT NULL,
PRIMARY KEY (ArticleID, Reason),
FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)
);

DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
	AuthorID varchar(101) NOT NULL,
	Content mediumblob NOT NULL,
	ArticleID bigint(255) NOT NULL,
	Time datetime NOT NULL,
	Floor tinyint(255) NOT NULL,
	TagFloor tinyint(255),
	PRIMARY KEY (AuthorID, Floor),
FOREIGN KEY (AuthorID) REFERENCES Users (UserID),
FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)
) ;

DROP TABLE IF EXISTS FollowHeart;
CREATE TABLE FollowHeart (
ArticleID bigint(255) NOT NULL,
UserID varchar(101) NOT NULL,
PRIMARY KEY (ArticleID, UserID),
FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID),
FOREIGN KEY (UserID) REFERENCES Users (UserID)
) ;

DROP TABLE IF EXISTS FollowKeep;
CREATE TABLE FollowKeep (
ArticleID bigint(255) NOT NULL,
UserID varchar(101) NOT NULL,
KeepID tinyint(255) NOT NULL,
AddTime datetime NOT NULL,
PRIMARY KEY (ArticleID, UserID),
FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID),
FOREIGN KEY (UserID) REFERENCES Users (UserID)
) ;

DROP TABLE IF EXISTS Notice;
CREATE TABLE Notice (
UserID varchar(101) NOT NULL,
Times datetime NOT NULL,
Content varchar(255) NOT NULL,
PRIMARY KEY (UserID, Times, Content),
FOREIGN KEY (UserID) REFERENCES Users (UserID)
) ;

DROP TABLE IF EXISTS KeepDir;
CREATE TABLE KeepDir (
DirID tinyint(255) NOT NULL,
UserID varchar(101) NOT NULL,
DirName varchar(255) NOT NULL,
PRIMARY KEY (UserID, DirID),
FOREIGN KEY (UserID) REFERENCES Users (UserID)
) ;
```
