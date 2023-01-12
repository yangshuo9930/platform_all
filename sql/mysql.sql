-- 字符串函数

-- concat(s1,s2,...sn)
select concat('hello','world');
select concat((select name from tb_student where name='杨朔9930' limit 1), '牛逼') t;

-- lower(str) upper(str)
select upper((select name from tb_student where name='ws')) as t;
select lower(upper((select name from tb_student where name='ws'))) as t;

-- lpad(str,n, pad) rpad(str,n,pad)
select lpad('9930', 6, '0');
select *, lpad(name, 4, '0') as name from tb_student;

-- trim()
select trim(' AA b c ');

-- substring()
select substring((select name from tb_student where name='杨朔9930' limit 1), 2, 3);

--
update tb_student set workno = '123';
update tb_student set workno = lpad(workno,5,'0');


-- 数值函数

-- ceil
select ceil(11.2);

-- floor
select floor(11.2);

-- mod
select mod(7,2);

-- round
select round(11.2);

-- rand
select round(rand() * 10, 2);

-- 6位随机验证码
select lpad(round(rand() * 1000000), 6, '0');

-- DQL基础查询

-- 基础查询
select * from tb_student;
select name,age from tb_student;
-- 重命名
select name as username, age as age1 from tb_student;

-- 去重重复数据
select distinct name from tb_student;

-- 条件查询
select * from tb_student where entryDate is null;
select * from tb_student where idcard is not null;
select * from tb_student where age between 10 and 20;
update tb_student set entryDate='2030-03-03' where name='王者';

select * from tb_student where entryDate between now() and '2099-01-01';
select * from tb_student where entryDate < now();

select * from tb_student where gender='女' and age <18;

-- 性别是男或者null, 并且age是null
select * from tb_student where gender in('男', null) and age is null;

-- 姓名是两个字的
select * from tb_student where name like ('__');

-- 姓名中带 王
select * from tb_student where name like ('%王%');

-- 身份证最后一位是x
select * from tb_student where idcard like ('%x');


-- 聚合查询
-- 查询表中存在多少条数据
select count(*) from tb_student;
-- 身份证有值的有多少条数据
select count(idcard) from tb_student;
-- age 大于 15 的有多少条数据
select count(*) from tb_student where age > 15;

-- 平均 age
select avg(age) from tb_student;
select avg(age) from tb_student where idcard is not null;

-- min max sum
select min(age) from tb_student;


-- 分组查询 group by group_concat: 放置每一组的每字段的值的集合
select gender, count(*), group_concat(name) from tb_student group by gender;
-- 根据男女分组, 男女的平均年龄
select gender, avg(age) from tb_student where gender !='无' group by gender;
-- 查询年龄大于等于18的, 并根据性别分组, 获取数量大于等于2的性别
select gender from tb_student where age>11 group by gender having count(*) > 2;

-- 排序查询
-- 根据年龄排序
select * from tb_student order by age asc;
select * from tb_student order by age desc;

select * from tb_student order by age asc, entryDate desc;

-- 分页查询
select s.age from tb_student s limit 2, 3;

-- DML 操作数据库
-- 添加数据
insert into tb_student (id, name, gender, age, idcard, entryDate, workno) values ('1000','小小五', '男', 45,'211234188367131210', '2010-10-12','9930');
insert into tb_student values ('111','王小虎', '男', 34,null,'1989-12-01','3306'),('222','李明明','女',19,null,'1999-01-01','27017');

-- 删除数据
delete from tb_student where name='云南';

-- 修改数据
update tb_student set age=67 where age=45;

show databases ;
select database();
drop database test_schema;
create database  if not exists  test_schema default charset utf8;
