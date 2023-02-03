-- 创建一个数据库
create database if not exists schema_restrict;
-- 使用此数据库
use schema_restrict;

-- 创建一个表, 用来练习约束
create table if not exists user(
    id int auto_increment primary key comment '唯一识别id',
    name varchar(30) comment '用户姓名',
    gender char(1) comment '用户性别',
    age tinyint unsigned comment '年龄',
    nickname varchar(10) comment '用户昵称',
    password varchar(12) comment '用户密码',
    status tinyint default -1 comment 'vip等级'
) comment '用户表';

-- ddl 新增一个 check 约束字段
alter table user add source varchar(10) check (source like('S%')) comment '用户的来源';
-- ddl 调整 status 不为null
alter table user change status status tinyint not null default -1 comment 'vip等级';
-- ddl 调整 nickname 唯一
alter table user modify nickname varchar(10) not null comment '用户昵称';
-- ddl 调整 gender 只能是 '男' '女'
alter table user modify gender char(1) check ( gender like ('男') or gender like ('女')) comment '用户性别';
-- ddl 再次更改source 字段, 默认来源为 S_Phone
alter table user modify source varchar(10) check (source like('S%')) default 'S_Phone' not null comment '用户的来源';

-- 插入数据开始测试
insert into user values (null,'杨朔','男',25,'🍁枫叶🍁','9930',null,'S_QQ'); -- 成功插入
insert into user values (null,'杨朔','男',25,'🍁枫叶🍁','9930',null,'WX'); -- 插入失败, source 不符合以 'S' 开头
insert into user values (3,'王小明','女',19,'武帝','123456',1,'S_WX'); -- 插入成功
insert into user values (null,'刘洋',null,23,'小米迷','123456', -1 ,'S_WX'); -- 插入成功
insert into user values (null,'张三','中',21,'每一天','123456',1,'S_WX'); -- 插入失败, 性别必须为 '男' or '女'
insert into user (name, gender, age, nickname, password) values ('杨洋','男',45,'男人一枝花','9999');

-- 创建一张vip等级表
create table if not exists vipLevel(
    id tinyint primary key comment '主键',
    name varchar(10) unique comment 'vip等级'
) comment 'vip等级表';

-- 新增两条数据
insert into vipLevel (id,name) values (-1, '普通用户');
insert into vipLevel (name) values ('一级VIP'),('二级vip'),('三级VIP'),('四级VIP'),('终极贵宾');

-- 给user表的status指定为外键
alter table user add constraint user_fk_status foreign key (status) references vipLevel (id);

-- 删除vip表中的id为-1的肯定不行
delete from vipLevel where id = -1;
-- 删除id为5的可以,因为user表中没有对应的status为5的数据
delete from vipLevel where id = 5;

-- 修改更新行为
-- cascade set null set default
-- 先删除外键约束在添加/更新外键约束
-- alter table emp drop foreign key fk_emp_dept_id;
-- ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY (外键字段) REFERENCES 主表名 (主表字段名)
-- ON UPDATE CASCADE ON DELETE CASCADE;