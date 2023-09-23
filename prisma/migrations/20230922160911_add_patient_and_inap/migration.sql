-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "grade" TEXT,
    "hostel" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inap" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "complaint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnAt" TIMESTAMP(3),
    "status" TEXT,

    CONSTRAINT "Inap_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Inap" ADD CONSTRAINT "Inap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inap" ADD CONSTRAINT "Inap_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
