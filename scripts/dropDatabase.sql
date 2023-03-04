-- Drop Tables
drop table public."User" cascade;

drop table public."UserAccess" cascade;

drop table public."UserExtenalIdentifier" cascade;

drop table public."UserPersonalData" cascade;

-- Drop types
DROP TYPE public."UserActivityStatus" cascade;

DROP TYPE public."UserExternalSource" cascade;

DROP TYPE public."UserPersonaDataPriority" cascade;

DROP TYPE public."UserInfoType" cascade;

DROP TYPE public."UserAccessType" cascade;

-- Drop migrations baseline
DROP table public."_prisma_migrations";