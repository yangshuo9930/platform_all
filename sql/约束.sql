-- 删除用户表
drop table tb_users;
-- 创建一个约束用户表
create table if not exists tb_users(
    id int auto_increment primary key comment '唯一识别id',
    username varchar(12) not null unique comment '用户名',
    name varchar(5) not null comment '姓名',
    age tinyint unsigned check (age <= 160) comment '年龄',
    status char(2) default '1' COMMENT 'xx状态',
    gender char(1) comment '性别'
) comment '约束用户-表';

-- 验证
insert into tb_users (username, name, age, status, gender) values ('我是无敌的','杨朔',25,'2','男'); # 成功
insert into tb_users (username, name, age, gender) values ('无敌战神暴龙🤣','王虎',200,'女'); # age 不满足要求


-- 添加外键
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept(id);

alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references
dept(id) on update cascade on delete cascade;

delete from dept where id = 1;

update dept set id = 6 where id =2;

delete from dept where id  =5;


-- 删除外键
alter table emp drop foreign key fk_emp_dept_id;

-- 新建外键, 并约束外键更新和删除状态为 set null
alter table emp add constraint fk_emp_dept_id foreign key (dept_id) references dept(id) on update set null on delete set null;

-- 修改父表的id为1的记录
update dept set id = 7 where id = 1; # 发现子表中原先dept_id 为 1 的全部变为了null


