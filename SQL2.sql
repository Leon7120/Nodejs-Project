DROP TABLE IF EXISTS User,Pizza,`Order`,OrderDetails,History,Payment,Topping;

CREATE TABLE IF NOT EXISTS User (
    u_id varchar(36) NOT NULL UNIQUE,
    u_username varchar(50) UNIQUE,
    u_password varchar(255),
    u_create_date datetime NOT NULL,
    u_status boolean NOT NULL DEFAULT 1,
    PRIMARY KEY (u_id)
);
CREATE TABLE IF NOT EXISTS Pizza ( 
    pizza_id int NOT NULL UNIQUE,
    pizza_category varchar(30)  NOT NULL UNIQUE,
    pizza_price int NOT NULL,
    PRIMARY KEY (pizza_id)
);
CREATE TABLE IF NOT EXISTS Topping(
    t_id int NOT NULL,
    t_name varchar(30) NOT NULL UNIQUE,
    t_price int NOT NULL,
    PRIMARY KEY(t_id)
);
CREATE TABLE IF NOT EXISTS `Order` (
    o_id int NOT NULL ,
    o_date datetime NOT NULL,
    u_id varchar(36) NOT NULL,
    PRIMARY KEY (o_id),
    FOREIGN KEY (u_id) REFERENCES User(u_id)
);
CREATE TABLE IF NOT EXISTS OrderDetails (
    o_detail_id int NOT NULL AUTO_INCREMENT,
    o_detail_quantity int NOT NULL,
    t_id int,
    pizza_id int NOT NULL,
    o_id int NOT NULL,
    PRIMARY KEY(o_detail_id),
    FOREIGN KEY (t_id) REFERENCES Topping(t_id),
    FOREIGN KEY (pizza_id) REFERENCES Pizza(pizza_id),
    FOREIGN KEY (o_id) REFERENCES `Order`(o_id)
);
CREATE TABLE IF NOT EXISTS Payment (
    payment_id int NOT NULL,
    payment_total_price int NOT NULL,
    payment_total_items int NOT NULL,
    payment_date datetime NOT NULL,
    payment_status boolean NOT NULL DEFAULT false,
    o_id int NOT NULL,
    o_detail_id int NOT NULL,
    PRIMARY KEY (payment_id),
    FOREIGN KEY (o_id) REFERENCES `Order`(o_id),
    FOREIGN KEY (o_detail_id) REFERENCES OrderDetails(o_detail_id)
);
CREATE TABLE IF NOT EXISTS History (
    h_id int NOT NULL,
    u_id varchar(36) NOT NULL,
    payment_id int NOT NULL,
    o_id int NOT NULL,
    PRIMARY KEY(h_id),
    FOREIGN KEY(u_id) REFERENCES User (u_id),
    FOREIGN KEY(payment_id) REFERENCES Payment (payment_id),
    FOREIGN KEY(o_id) REFERENCES `Order`(o_id)
);

INSERT INTO User VALUES (uuid(),'654321','123456@Abc',CURDATE(),default),
(1,'987654','123456@Abc',CURDATE(),default);
INSERT INTO Pizza VALUES (1,'hawaii', 20),(2,'mozallera', 25);
INSERT INTO Topping VALUES(1,"cheese",2),(2,"ham",3);
INSERT INTO `Order`(o_id,o_date,u_id) VALUES(1,NOW(),1),(2,NOW(),1);
INSERT INTO OrderDetails VALUES(1,1,1,1,1),(2,2,1,1,1),(3,2,2,2,2),(4,2,2,1,2);
INSERT INTO Payment VALUES(1,50,3,NOW(),DEFAULT,1,1);
INSERT INTO History VALUES(1,1,1,1);


-- o_id o_detail_id o_detail_quantity pizza_price pizza_category t_price t_name o_date Total Price
-- 1	1	1	20	hawaii	2	cheese	2023-10-11 00:00:00	22
-- 1	2	2	20	hawaii	2	cheese	2023-10-11 00:00:00	42
-- 2	4	2	25	mozallera	2	cheese	2023-10-11 00:00:00	52
-- 2	3	2	25	mozallera	3	ham	2023-10-11 00:00:00	53
SELECT odetail.o_id,odetail.o_detail_id,odetail.o_detail_quantity,p.pizza_price,
p.pizza_category,t.t_price,t.t_name,o.o_date,
(pizza_price * odetail.o_detail_quantity) + t.t_price AS "Total Price"
FROM OrderDetails odetail
INNER JOIN pizza p ON odetail.pizza_id = p.pizza_id
INNER JOIN `order` o ON odetail.o_id = o.o_id
INNER JOIN topping t ON odetail.t_id = t.t_id
ORDER BY odetail.o_id;

-- Order ID	Total Quantity	Total Price	Order Date
-- 1	    3	            64	        10/11/2023 0:00
-- 2	    4	            105	        10/11/2023 0:00
SELECT pricePerPizza.o_id AS "Order ID",
SUM(pricePerPizza.o_detail_quantity) AS "Total Quantity",
SUM(pricePerPizza.`Pizza Price`) AS "Total Price",
pricePerPizza.o_date AS "Order Date"
FROM (SELECT 
odetail.o_id,
odetail.o_detail_quantity ,o.o_date,
(pizza_price * odetail.o_detail_quantity) + t.t_price AS "Pizza Price"
FROM OrderDetails odetail
INNER JOIN pizza p ON odetail.pizza_id = p.pizza_id
INNER JOIN `order` o ON odetail.o_id = o.o_id
INNER JOIN topping t ON odetail.t_id = t.t_id
ORDER BY odetail.o_id) AS pricePerPizza
GROUP BY pricePerPizza.o_id



