import express from "express"; import cors from "cors"; import { PrismaClient, VacancyStatus } from "@prisma/client";
const prisma=new PrismaClient(), app=express(); app.use(cors()); app.use(express.json());
app.get("/health",(_,res)=>res.json({status:"ok"}));
app.get("/api/dashboard",async(_,res)=>{const [open,hired,positions,separations]=await Promise.all([prisma.vacancy.count({where:{status:{in:[VacancyStatus.PENDING,VacancyStatus.PUBLISHED,VacancyStatus.INTERVIEWS,VacancyStatus.OFFER]}}}),prisma.vacancy.count({where:{status:VacancyStatus.HIRED}}),prisma.position.aggregate({_sum:{authorized:true,occupied:true}}),prisma.separation.count()]);res.json({openVacancies:open,hiredVacancies:hired,authorized:positions._sum.authorized||0,occupied:positions._sum.occupied||0,separations});});
app.get("/api/vacancies",async(req,res)=>res.json(await prisma.vacancy.findMany({include:{department:true,leader:true},orderBy:{publishedAt:"asc"}})));
app.post("/api/vacancies",async(req,res)=>res.status(201).json(await prisma.vacancy.create({data:req.body})));
app.get("/api/insights",async(_,res)=>res.json(await prisma.insight.findMany({where:{dismissedAt:null},orderBy:{createdAt:"desc"}})));
app.listen(process.env.PORT||4000,()=>console.log("People Analytics API on :4000"));
