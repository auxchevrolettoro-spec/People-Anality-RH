import { PrismaClient, RecruitmentSource, Role, SeparationReason, SeparationType, VacancyStatus } from "@prisma/client";
const prisma = new PrismaClient();
async function main(){
 const sales=await prisma.department.upsert({where:{name:"Ventas"},update:{},create:{name:"Ventas",agency:"Chihuahua"}}); const service=await prisma.department.upsert({where:{name:"Servicio"},update:{},create:{name:"Servicio",agency:"Chihuahua"}});
 const juan=await prisma.leader.create({data:{name:"Juan Pérez",departmentId:sales.id}}); const ana=await prisma.leader.create({data:{name:"Ana Torres",departmentId:service.id}});
 const advisor=await prisma.position.create({data:{title:"Asesor de ventas",departmentId:sales.id,authorized:204,occupied:155,monthlyCost:1840000}}); const tech=await prisma.position.create({data:{title:"Técnico mecánico",departmentId:service.id,authorized:113,occupied:95,monthlyCost:889000}});
 await prisma.user.upsert({where:{email:"mariana@horizonte.mx"},update:{},create:{email:"mariana@horizonte.mx",name:"Mariana Castro",role:Role.ADMIN,leaderId:juan.id}});
 await prisma.vacancy.createMany({data:[{number:"VAC-2025-042",title:"Asesor de ventas",departmentId:sales.id,positionId:advisor.id,leaderId:juan.id,status:VacancyStatus.INTERVIEWS,source:RecruitmentSource.INDEED,requestedAt:new Date("2025-05-20"),publishedAt:new Date("2025-05-25"),candidateCount:18,interviewedCount:6},{number:"VAC-2025-041",title:"Técnico mecánico",departmentId:service.id,positionId:tech.id,leaderId:ana.id,status:VacancyStatus.PUBLISHED,source:RecruitmentSource.FACEBOOK,requestedAt:new Date("2025-05-28"),publishedAt:new Date("2025-06-01"),candidateCount:24}]});
 await prisma.insight.createMany({data:[{title:"Ventas concentra la rotación más alta",message:"El índice de 18.6% supera 35% el promedio.",recommendation:"Capacitar al líder y realizar entrevistas de permanencia.",severity:"CRITICAL",entityType:"DEPARTMENT",entityId:sales.id,period:"2025-07"}]});
}
main().finally(()=>prisma.$disconnect());
