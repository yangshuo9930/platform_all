SELECT orgUser.name as 销售名称,date_format(da.createdTime,'%Y-%m') as 日期,
       orgDept.name as 所属部门,count(1) as 需求数量,ifnull(ta.requirementNumber,0) as 需求落地数量,
    ifnull(sum(da.comfirm_service_amount),0) 需求累计金额
FROM cloudpivot.i6xzh_Demand_apply da
left join h_org_user orgUser on  da.creater=orgUser.id
left join h_org_department orgDept on  da.createdDeptId=orgDept.id

left join (SELECT creater,count(1) as requirementNumber FROM cloudpivot.i6xzh_Demand_apply dda
where dda.comfirm_service_amount>0 group by creater) ta on ta.creater=da.creater
group by da.creater,date_format(da.createdTime,'%Y-%m');


SELECT orgUser.name as 需求申请人,orgDept.name as 申请人部门,da.sequenceNo as 需求单号,da.name as 需求标题
	,clientOrgDept.name as 供应商,sheet.Date1672120939551 as 访谈日期,sheet.ShortText1670465361386 as 访谈时间,sheet.ShortText1671433256233 as 项目对外标题
    ,sheet.LongText1671433277062 as 项目职位,sheet.Dropdown1671433483396 as 服务类型,sheet.Dropdown1670221893451 as 收费类型
    ,sheet.Number1671433540046 as 客户时长min,sheet.Number1671433585625 as 访谈翻倍
    ,sheet.Number1670464993883 as 计费小时h,sheet.Number1670465115471 as 支付金额,sheet.industry_name as 行业,sheet.LongText1670901246423 as 客户联系人
FROM cloudpivot.i6xzh_Demand_apply da
left join h_org_user orgUser on  da.creater=orgUser.id
left join h_org_department orgDept on da.createdDeptId=orgDept.id
left join cloudpivot.i6xzh_Demand_provide dp on da.sequenceNo = dp.ShortText1670219977543
left join h_org_department clientOrgDept on dp.createdDeptId=clientOrgDept.id
left join cloudpivot.i6xzh_Sheet1670220374391 sheet on sheet.parentId = dp.id
where da.comfirm_service_amount>0 and (Logic1670220351987=1 and Logic1670222654426=1) and sheet.Dropdown1670220490454='是';