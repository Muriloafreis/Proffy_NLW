const Database = require('./db.js')
const createProffy = require('./createProffy')


Database.then(async (db) => {
     // Inserir dados
    proffyValue = {
        name: 'Kell',
        avatar: 'https://photos.google.com/u/1/search/_cAF1QipPA0scsbCSQBTyNtBaOmP2zD1fmEodPjbU_/photo/AF1QipO7_Md7W2JkzuvqTli3IhYpgEAomniC3orkyWl6',
        whatsapp: '11958796913',
        bio: 'Instrutor de Educação Física, joga bola todo final de semana, sabe andar de skate e fuma maconha.',
    }

    classValue = {
        subject: "4",
        cost: "50",
        // o proffy id vira pelo banco de dados
    }

    classScheduleValues = [
        //class_id vira pelo banco de dados, após cadastrarmos a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consultar os dados inseridos

    // todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // consultar as classes de um determinado professor
    // e trazer junto os dados do professor
    const selectClassesAndProffys = await db.all(`
        SELECT classes. *, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClassesAndProffys)

    // o horário que a pessoa trabalha, por exemplo, é das 08h - 18h
    // o horário do time_from (8h) precisa ser menor ou igual ao horário solicitado
    // o time_to precisa ser acima
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    console.log(selectClassesSchedules)

})