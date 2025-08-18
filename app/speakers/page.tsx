"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TopBar } from "@/components/sections/top-bar"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { Award, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Speaker Data
const keynoteSpeakers = [
  {
    id: "tinubu",
    name: "His Excellency, Bola Ahmed Tinubu",
    title: "President, Federal Republic of Nigeria",
    image: "/images/TINUBU-7.jpg?height=400&width=400",
    shortBio:
      "Visionary leader and President of the Federal Republic of Nigeria, driving national transformation and development.",
    fullBio: `His Excellency, Bola Ahmed Tinubu is the President of the Federal Republic of Nigeria, having assumed office on May 29, 2023. A distinguished statesman, political leader, and former Governor of Lagos State, President Tinubu brings decades of transformative leadership experience to the highest office in Nigeria.

Born on March 29, 1952, President Tinubu holds a Bachelor's degree in Business Administration from Chicago State University, United States. His educational background in business and finance has been instrumental in shaping his approach to governance and economic development throughout his political career.

Before becoming President, Tinubu served as the Governor of Lagos State from 1999 to 2007, where he transformed Lagos into Nigeria's economic powerhouse. His administration laid the foundation for modern Lagos through innovative policies in revenue generation, infrastructure development, and public service delivery. Under his leadership, Lagos State's internally generated revenue increased dramatically, making it less dependent on federal allocations.

As a political strategist and leader, President Tinubu has been instrumental in Nigeria's democratic development. He played crucial roles in the formation of the All Progressives Congress (APC) and has been a mentor to numerous political leaders across Nigeria. His political acumen and ability to build coalitions have earned him recognition as one of Nigeria's most influential political figures.

President Tinubu's vision for Nigeria centers on economic transformation, job creation, security enhancement, and national unity. His administration focuses on addressing Nigeria's economic challenges through strategic reforms, infrastructure development, and policies that promote inclusive growth and development across all regions of the country.`,
    achievements: [
      "Transformed Lagos State into Nigeria's economic hub as Governor",
      "Pioneered innovative revenue generation strategies in Lagos",
      "Key architect of Nigeria's democratic consolidation",
      "Instrumental in forming the All Progressives Congress (APC)",
      "Mentored numerous successful political leaders",
      "Champion of federalism and state autonomy",
    ],
    sessions: [
      {
        title: "Economic Session - Keynote",
        time: "Friday, Sept 19 | 11:00 AM - 12:30 PM",
        description: "Nigeria and the New African Economy: A Diaspora-Driven Blueprint",
      },
    ],
  },
  {
    id: "sanwo-olu",
    name: "His Excellency, Mr. Babajide Olusola Sanwo-Olu",
    title: "Executive Governor, Lagos State",
    image: "/images/sanwoolu.jpg?height=400&width=400",
    shortBio: "Visionary leader transforming Lagos State through innovative governance and sustainable development.",
    fullBio: `His Excellency, Mr. Babajide Olusola Sanwo-Olu is the Executive Governor of Lagos State, Nigeria, having assumed office on May 29, 2019. A seasoned administrator and technocrat, Governor Sanwo-Olu has brought a wealth of experience from both the private and public sectors to his role as the chief executive of Nigeria's commercial capital.

Born on June 25, 1965, in Lagos, Governor Sanwo-Olu holds a Bachelor of Science degree in Surveying from the University of Lagos and a Master of Business Administration from the University of Liverpool, United Kingdom. He is also an alumnus of the prestigious Lagos Business School Senior Management Programme and Harvard Business School.

Before his election as Governor, Sanwo-Olu served in various capacities in Lagos State government, including as Commissioner for Establishments, Training and Pensions (2007-2009), Commissioner for Commerce and Cooperatives (2009-2012), and Commissioner for Waterfront Infrastructure Development (2013-2016). His extensive experience in public administration has equipped him with deep insights into the workings of government and the challenges facing Lagos State.

As Governor, Sanwo-Olu has championed the T.H.E.M.E.S agenda - Traffic Management and Transportation, Health and Environment, Education and Technology, Making Lagos a 21st Century Economy, Entertainment and Tourism, and Security and Governance. Under his leadership, Lagos State has witnessed significant improvements in infrastructure development, healthcare delivery, education, and economic growth.

His administration has prioritized digital transformation, making Lagos a smart city through various technology initiatives. The Governor has also focused on improving the ease of doing business, attracting both local and international investments to the state.

Governor Sanwo-Olu's leadership during the COVID-19 pandemic was particularly noteworthy, as he implemented comprehensive health and economic measures that helped Lagos State navigate the crisis effectively. His commitment to transparency, accountability, and inclusive governance has earned him recognition both nationally and internationally.`,
    achievements: [
      "Led Lagos State's digital transformation initiatives",
      "Implemented comprehensive COVID-19 response strategy",
      "Advanced the T.H.E.M.E.S development agenda",
      "Improved ease of doing business rankings for Lagos",
      "Championed sustainable urban development projects",
    ],
    sessions: [
      {
        title: "Fireside Chat ",
        time: "Thursday, Sept 18 | 10:00 AM - 11:00 AM",
        description: "Lagos: Africa's Gateway for Diaspora Partnerships and Global Growth",
      },
    ],
  },
  {
    id: "alausa",
    name: "Dr. Tunji Alausa",
    title: "Hon. Minister of Education, Federal Republic of Nigeria",
    image: "/images/Tunji-Alausa.jpg?height=400&width=400",
    shortBio: "Distinguished educator and policy maker driving educational transformation across Nigeria.",
    fullBio: `Dr. Tunji Alausa serves as the Honourable Minister of Education for the Federal Republic of Nigeria, bringing extensive experience in healthcare, education, and public administration to his role. A medical doctor by training and an accomplished administrator, Dr. Alausa has dedicated his career to improving Nigeria's human capital development through strategic policy implementation and institutional reforms.

Dr. Alausa holds a medical degree and has pursued advanced studies in public health and administration. His multidisciplinary background has equipped him with unique insights into the intersection of health, education, and social development, making him particularly effective in addressing Nigeria's complex educational challenges.

Before his appointment as Minister of Education, Dr. Alausa served in various capacities in Lagos State government, including as Commissioner for Health, where he implemented groundbreaking healthcare reforms and policies. His experience in healthcare administration has informed his approach to educational policy, particularly in areas of school health programs, nutrition, and student welfare.

As Minister of Education, Dr. Alausa has focused on comprehensive educational reforms aimed at improving access, quality, and relevance of education at all levels. His administration has prioritized teacher training and development, curriculum modernization, infrastructure development, and the integration of technology in education delivery.

Dr. Alausa is passionate about creating an educational system that prepares Nigerian students for the challenges of the 21st century. His vision includes strengthening technical and vocational education, promoting STEM education, and ensuring that Nigeria's educational system produces graduates who can compete globally while contributing to national development.

His leadership style emphasizes collaboration with stakeholders, evidence-based policy making, and continuous improvement in educational outcomes. Under his guidance, the Ministry of Education has initiated several innovative programs aimed at addressing educational inequalities and improving learning outcomes across Nigeria.`,
    achievements: [
      "Implemented comprehensive healthcare reforms as Lagos State Commissioner",
      "Pioneered innovative school health programs",
      "Advanced teacher training and development initiatives",
      "Promoted STEM education and technical skills development",
      "Strengthened educational infrastructure development",
      "Enhanced collaboration between federal and state educational systems",
    ],
    sessions: [
      {
        title: "Economic Session - Special Address",
        time: "Friday, Sept 19 | 11:00 AM - 12:30 PM",
        description: "Education as the Foundation for Africa's Future",
      },
    ],
  },
  {
    id: "cardoso",
    name: "Mr. Olayemi Cardoso",
    title: "Governor, Central Bank of Nigeria",
    image: "/images/cardoso.png?height=450&width=400",
    shortBio: "Seasoned financial expert leading Nigeria's monetary policy and economic stabilization efforts.",
    fullBio: `Mr. Olayemi Cardoso serves as the Governor of the Central Bank of Nigeria (CBN), bringing over three decades of distinguished experience in banking, finance, and economic policy to Nigeria's apex bank. A seasoned financial expert and former investment banker, Governor Cardoso has been instrumental in shaping Nigeria's monetary policy and financial sector development.

Governor Cardoso holds a Bachelor's degree in Economics from the University of Lagos and a Master's degree in Business Administration from Harvard Business School. His educational background in economics and business administration, combined with extensive international experience, has equipped him with the expertise necessary to navigate Nigeria's complex economic challenges.

Before his appointment as CBN Governor, Cardoso had a distinguished career in investment banking and financial services. He served as Managing Director of Citibank Nigeria Limited and held senior positions in various international financial institutions. His experience spans corporate banking, investment banking, treasury operations, and financial market development.

As CBN Governor, Cardoso has focused on monetary policy stability, inflation management, exchange rate stability, and financial sector reforms. His administration has prioritized strengthening Nigeria's financial system, promoting financial inclusion, and supporting economic growth through strategic monetary policy interventions.

Governor Cardoso's approach to central banking emphasizes transparency, data-driven decision making, and collaboration with fiscal authorities to achieve macroeconomic stability. He has been instrumental in implementing policies that support Nigeria's economic diversification efforts while maintaining price stability and financial system integrity.

His vision for Nigeria's financial sector includes modernizing payment systems, strengthening regulatory frameworks, promoting digital financial services, and positioning Nigeria as a leading financial hub in Africa. Under his leadership, the CBN continues to play a crucial role in Nigeria's economic development and financial sector transformation.`,
    achievements: [
      "Led major financial institutions as Managing Director",
      "Implemented strategic monetary policy reforms",
      "Advanced financial inclusion initiatives across Nigeria",
      "Strengthened Nigeria's payment system infrastructure",
      "Promoted digital financial services adoption",
      "Enhanced central bank transparency and communication",
    ],
    sessions: [
      {
        title: "Economic Session - Panel",
        time: "Friday, Sept 19 | 11:00 AM - 12:30 PM",
        description: "Central bank perspective on Nigeria's economic outlook and monetary policy",
      },
    ],
  },
  {
    id: "tajudeen",
    name: "Rt. Hon. Abbas Tajudeen, Ph.D.",
    title: "Speaker, Federal House of Representatives",
    image: "/images/Tajudeen-Abbas.jpg?height=400&width=400",
    shortBio: "Distinguished legislator and academic leading Nigeria's legislative agenda and democratic governance.",
    fullBio: `Rt. Hon. Abbas Tajudeen, Ph.D., serves as the Speaker of the Federal House of Representatives of Nigeria, bringing extensive legislative experience and academic expertise to the leadership of Nigeria's lower chamber of parliament. A distinguished legislator, academic, and public administrator, Speaker Abbas has been at the forefront of Nigeria's legislative development and democratic consolidation.

Dr. Abbas holds a Ph.D. and has combined his academic background with practical legislative experience to become one of Nigeria's most respected parliamentary leaders. His educational achievements and scholarly approach to legislation have contributed significantly to the quality of legislative discourse and policy development in Nigeria.

Before becoming Speaker, Dr. Abbas served multiple terms as a member of the House of Representatives, where he distinguished himself through his commitment to legislative excellence, constituency representation, and national development. His experience spans various legislative committees and leadership positions, giving him comprehensive understanding of Nigeria's legislative processes.

As Speaker, Dr. Abbas has focused on strengthening Nigeria's democratic institutions, improving legislative processes, and enhancing the House's role in national governance. His leadership has emphasized transparency, accountability, and effective representation of Nigerian citizens' interests in the legislative process.

Dr. Abbas's vision for the House of Representatives includes modernizing legislative procedures, strengthening oversight functions, improving constituency engagement, and positioning the legislature as a true partner in Nigeria's development agenda. His academic background has been particularly valuable in crafting evidence-based legislation and policy interventions.

Under his leadership, the House has prioritized key national issues including economic development, security, education, healthcare, and infrastructure development. His collaborative approach has fostered better working relationships between the legislature and other arms of government, contributing to more effective governance.

His commitment to democratic values, legislative excellence, and national development has earned him recognition as one of Nigeria's most effective legislative leaders. Dr. Abbas continues to champion reforms that strengthen Nigeria's democratic institutions and improve governance outcomes.`,
    achievements: [
      "Multiple terms as distinguished House of Representatives member",
      "Advanced legislative modernization and transparency initiatives",
      "Strengthened parliamentary oversight and accountability mechanisms",
      "Enhanced constituency representation and engagement",
      "Promoted evidence-based legislation and policy development",
      "Fostered inter-governmental collaboration and cooperation",
    ],
    sessions: [
      {
        title: "Economic Session",
        time: "Friday, Sept 19 | 11:00 AM - 12:30 PM",
        description: "Parliamentary perspective on Nigeria's democratic development and legislative priorities",
      },
    ],
  },
  {
    id: "pate",
    name: "Prof. Muhammad Ali Pate",
    title: "Coordinating Minister of Health & Social Welfare, Federal Republic of Nigeria",
    image: "/images/Ali-Pate.jpg?height=400&width=400",
    shortBio:
      "Global health expert and policy leader driving healthcare transformation and social welfare reforms in Nigeria.",
    fullBio: `Prof. Muhammad Ali Pate serves as the Coordinating Minister of Health and Social Welfare for the Federal Republic of Nigeria, bringing extensive global health expertise and policy leadership to Nigeria's healthcare transformation agenda. A distinguished physician, public health expert, and former World Bank executive, Professor Pate has dedicated his career to improving health outcomes and social welfare systems globally.

Professor Pate holds medical and public health degrees and has pursued advanced studies in health policy and management at leading international institutions. His academic background, combined with extensive field experience in global health, has positioned him as one of the world's leading experts in health systems strengthening and development.

Before his appointment as Coordinating Minister, Professor Pate served in senior positions at the World Bank, where he led global health initiatives and supported health system reforms in multiple countries. His international experience includes working with governments, development partners, and civil society organizations to design and implement large-scale health programs.

Professor Pate previously served as Nigeria's Minister of State for Health, where he led significant reforms in Nigeria's health sector, including the development of the National Health Act and the establishment of the Basic Health Care Provision Fund. His earlier experience in Nigeria's health sector provides him with deep understanding of the country's health challenges and opportunities.

As Coordinating Minister, Professor Pate has focused on comprehensive health system reforms, universal health coverage, primary healthcare strengthening, and social welfare program integration. His administration has prioritized addressing Nigeria's health workforce challenges, improving health infrastructure, and ensuring equitable access to quality healthcare services.

Professor Pate's vision for Nigeria's health sector includes achieving universal health coverage, strengthening health security, improving maternal and child health outcomes, and building resilient health systems that can respond effectively to health emergencies. His approach emphasizes evidence-based policy making, stakeholder engagement, and sustainable financing mechanisms.

His global perspective and local experience have been instrumental in positioning Nigeria's health sector for transformation while ensuring that reforms are contextually appropriate and sustainable. Under his leadership, Nigeria continues to make progress toward achieving its health and social welfare objectives.`,
    achievements: [
      "Led global health initiatives at the World Bank",
      "Developed Nigeria's National Health Act and Basic Health Care Provision Fund",
      "Advanced universal health coverage initiatives",
      "Strengthened primary healthcare systems across Nigeria",
      "Promoted health workforce development and capacity building",
      "Enhanced health security and emergency preparedness",
    ],
    sessions: [
      {
        title: "Economic Session",
        time: "Friday, Sept 19 | 11:00 AM - 12:30 PM",
        description: "Ministerial address on Nigeria's health sector reforms and social welfare integration",
      },
    ],
  },
  {
    id: "abayomi",
    name: "Prof. Emmanuel Akin Abayomi",
    title: "Hon. Commissioner for Health, Lagos State",
    image: "/images/akin-abayomi.jpg?height=400&width=400",
    shortBio:
      "Distinguished physician and health administrator leading Lagos State's healthcare excellence and innovation initiatives.",
    fullBio: `Prof. Emmanuel Akin Abayomi serves as the Honourable Commissioner for Health in Lagos State, bringing extensive medical expertise and healthcare administration experience to Lagos State's health sector transformation. A distinguished physician, academic, and healthcare leader, Professor Abayomi has been instrumental in positioning Lagos State as a leader in healthcare delivery and innovation in Nigeria.

Professor Abayomi holds medical degrees and advanced qualifications in his medical specialty, with additional training in healthcare management and administration. His academic background and clinical experience have provided him with comprehensive understanding of both the technical and administrative aspects of healthcare delivery.

Before his appointment as Commissioner, Professor Abayomi had a distinguished career in clinical practice, medical education, and healthcare administration. His experience spans both public and private healthcare sectors, giving him unique insights into the challenges and opportunities in Nigeria's healthcare system.

As Commissioner for Health, Professor Abayomi has led Lagos State's response to various health challenges, including the COVID-19 pandemic, where Lagos State was recognized for its effective public health response and innovative approaches to pandemic management. His leadership during health emergencies has demonstrated the importance of preparedness, coordination, and evidence-based decision making.

Professor Abayomi's administration has focused on strengthening Lagos State's health system through infrastructure development, human resource capacity building, health technology adoption, and improved service delivery. His initiatives have included expanding access to quality healthcare, strengthening primary healthcare systems, and promoting preventive health measures.

His vision for Lagos State's health sector includes achieving universal health coverage, building world-class healthcare facilities, developing local health technology solutions, and positioning Lagos as a medical tourism destination. His approach emphasizes innovation, quality improvement, and patient-centered care delivery.

Under his leadership, Lagos State has continued to set standards for healthcare delivery in Nigeria, implementing innovative programs and policies that serve as models for other states. Professor Abayomi's commitment to healthcare excellence and his collaborative approach have contributed significantly to Lagos State's health sector achievements.

His expertise in both clinical medicine and health administration has been particularly valuable in developing policies and programs that address Lagos State's unique health challenges while building on its strengths as Nigeria's commercial capital.`,
    achievements: [
      "Led Lagos State's exemplary COVID-19 pandemic response",
      "Advanced healthcare infrastructure development across Lagos",
      "Strengthened primary healthcare delivery systems",
      "Promoted health technology adoption and innovation",
      "Enhanced medical education and healthcare workforce development",
      "Improved health emergency preparedness and response capabilities",
    ],
    sessions: [
      {
        title: "Economic Session",
        time: "Friday, Sept 19 | 11:00 AM - 12:30 PM",
        description: "State perspective on healthcare delivery, innovation, and public health leadership",
      },
    ],
  },
  {
    id: "obasa",
    name: "Rt. Hon. Mudashiru Obasa",
    title: "Speaker, Lagos State House of Assembly",
    image: "/images/Mudashiru-Obasa.jpg?height=400&width=400",
    shortBio:
      "Experienced legislator and parliamentary leader driving legislative excellence and democratic governance in Lagos State.",
    fullBio: `Rt. Hon. Mudashiru Obasa serves as the Speaker of the Lagos State House of Assembly, bringing extensive legislative experience and parliamentary leadership to Lagos State's legislative arm of government. A seasoned legislator and democratic leader, Speaker Obasa has been instrumental in strengthening Lagos State's legislative institutions and advancing the state's development agenda through effective legislation.

Speaker Obasa has served multiple terms in the Lagos State House of Assembly, representing his constituency with distinction while contributing significantly to the state's legislative development. His extensive experience in parliamentary procedures, legislative drafting, and constituency representation has made him one of Nigeria's most respected state-level legislative leaders.

Before becoming Speaker, Obasa served in various leadership positions within the Lagos State House of Assembly, including committee chairmanships and other parliamentary roles. His progressive rise through the legislative hierarchy demonstrates his commitment to legislative excellence and his colleagues' confidence in his leadership abilities.

As Speaker, Obasa has focused on modernizing the Lagos State House of Assembly, improving legislative processes, and strengthening the Assembly's oversight functions. His leadership has emphasized transparency, accountability, and effective representation of Lagos State citizens' interests in the legislative process.

Speaker Obasa's tenure has been marked by significant legislative achievements that have supported Lagos State's development agenda. Under his leadership, the Assembly has passed landmark legislation in areas including urban development, economic growth, education, healthcare, and infrastructure development.

His vision for the Lagos State House of Assembly includes positioning it as a model legislative institution in Nigeria, strengthening its capacity for effective oversight, improving public engagement with the legislative process, and ensuring that legislation supports Lagos State's vision of becoming a 21st-century economy.

Speaker Obasa's collaborative approach has fostered strong working relationships between the legislative and executive arms of Lagos State government, contributing to more effective governance and policy implementation. His leadership has also emphasized the importance of legislative independence while maintaining constructive engagement with other arms of government.

His commitment to democratic values, legislative excellence, and Lagos State's development has earned him recognition as one of Nigeria's most effective state-level legislative leaders. Speaker Obasa continues to champion reforms that strengthen democratic institutions and improve governance outcomes at the state level.`,
    achievements: [
      "Multiple terms of distinguished service in Lagos State House of Assembly",
      "Advanced legislative modernization and institutional strengthening",
      "Passed landmark legislation supporting Lagos State development",
      "Strengthened legislative oversight and accountability mechanisms",
      "Enhanced public engagement with the legislative process",
      "Fostered effective inter-governmental collaboration",
    ],
    sessions: [
      {
        title: "Economic Session",
        time: "Friday, Sept 19 | 11:00 AM - 12:30 PM",
        description: "State legislative perspective on governance, development, and democratic institutions",
      },
    ],
  },
  {
    id: "alake",
    name: "Hon. Olatunbosun Alake",
    title: "Commissioner for Innovation, Science & Technology, Lagos State",
    image: "/images/Tubosun-Alake.jpg?height=400&width=400",
    shortBio: "Technology visionary driving innovation and digital transformation across Lagos State.",
    fullBio: `Hon. Olatunbosun Alake serves as the Commissioner for Innovation, Science & Technology in Lagos State, where he has been instrumental in positioning Lagos as Nigeria's technology and innovation hub. With over two decades of experience in technology, business development, and public administration, Commissioner Alake brings a unique blend of technical expertise and strategic leadership to his role.

A graduate of Computer Science from the University of Lagos, Commissioner Alake holds advanced degrees in Information Technology Management and has completed executive programs at leading international institutions. His academic background, combined with extensive industry experience, has equipped him with the knowledge and skills necessary to drive technological advancement in Lagos State.

Before his appointment as Commissioner, Alake held senior positions in various technology companies, where he led digital transformation initiatives and managed large-scale technology projects. His private sector experience includes roles in software development, systems integration, and technology consulting, giving him practical insights into the challenges and opportunities in the technology sector.

As Commissioner, Alake has spearheaded numerous initiatives aimed at making Lagos a smart city. Under his leadership, the Ministry has launched several programs including the Lagos State Resident Registration Agency (LASRRA) digital platform, e-governance initiatives, and technology incubation programs for startups and entrepreneurs.

Commissioner Alake is passionate about using technology to solve societal problems and improve the quality of life for Lagos residents. He has been a strong advocate for digital inclusion, ensuring that technology benefits reach all segments of society. His work has contributed significantly to Lagos State's recognition as a leading technology destination in Africa.

His vision for Lagos includes creating a robust digital ecosystem that supports innovation, entrepreneurship, and economic growth. Through partnerships with local and international technology companies, educational institutions, and development organizations, he continues to drive initiatives that position Lagos at the forefront of Africa's digital revolution.`,
    achievements: [
      "Launched Lagos State digital identity platform",
      "Established technology incubation centers across Lagos",
      "Led smart city transformation initiatives",
      "Developed comprehensive e-governance framework",
      "Promoted digital literacy programs statewide",
      "Attracted major tech investments to Lagos",
    ],
    sessions: [
      {
        title: "Economic Session",
        time: "Friday, Sept 19 | 11:00 AM - 12:30 PM",
        description: "Exploring how technology and innovation drive economic growth and development",
      },
    ],
  },
  {
    id: "opeifa",
    name: "Kayode Opeifa",
    title: "Managing Director, Nigerian Railway Corporation",
    image: "/images/kayode.jpg?height=400&width=400",
    shortBio:
      "Transportation expert and railway development leader driving Nigeria's rail infrastructure modernization.",
    fullBio: `Kayode Opeifa serves as the Managing Director of the Nigerian Railway Corporation (NRC), bringing extensive experience in transportation management, infrastructure development, and public administration to Nigeria's railway modernization efforts. A seasoned transportation expert and administrator, Opeifa has been instrumental in advancing Nigeria's rail infrastructure development and improving railway services across the country.

Opeifa holds advanced degrees in transportation and logistics management and has pursued specialized training in railway operations and infrastructure development. His educational background and professional experience have equipped him with comprehensive understanding of modern railway systems and their role in national economic development.

Before his appointment as Managing Director of NRC, Opeifa served in various senior positions in Lagos State government, including as Commissioner for Transportation, where he led significant reforms in Lagos State's transportation sector. His experience in state-level transportation management has provided him with valuable insights into the integration of different transportation modes and the importance of coordinated transportation planning.

As Managing Director of NRC, Opeifa has focused on modernizing Nigeria's railway infrastructure, improving service delivery, and expanding railway networks to connect major economic centers across the country. His administration has prioritized safety improvements, capacity building, and the adoption of modern railway technologies.

Opeifa's vision for Nigeria's railway sector includes developing a comprehensive national railway network that supports economic growth, reduces transportation costs, and provides safe, reliable, and efficient passenger and freight services. His approach emphasizes public-private partnerships, technology adoption, and sustainable development practices.

Under his leadership, NRC has made significant progress in railway infrastructure development, service improvement, and capacity expansion. His experience in both state and federal transportation management has been particularly valuable in coordinating railway development with other transportation modes and ensuring that railway projects align with broader national development objectives.

His commitment to transportation excellence and his understanding of Nigeria's transportation challenges have positioned him as a key leader in the country's infrastructure development efforts. Opeifa continues to champion initiatives that strengthen Nigeria's transportation sector and support national economic growth.`,
    achievements: [
      "Led comprehensive transportation reforms in Lagos State",
      "Advanced Nigeria's railway infrastructure modernization",
      "Improved railway safety standards and service delivery",
      "Expanded railway network connectivity across Nigeria",
      "Promoted public-private partnerships in railway development",
      "Enhanced railway workforce capacity and technical capabilities",
    ],
    sessions: [
      {
        title: "Economic Session - Dialogue",
        time: "Friday, Sept 19 | 11:00 AM - 12:30 PM",
        description: " Nigerian Railway Corporation: Transportation as Catalyst for Growth",
      },
    ],
  },
  {
    id: "dele-alake",
    name: "Dr. Dele Alake",
    title: "Hon. Minister of Solid Minerals Development, Federal Republic of Nigeria",
    image: "/images/Dele-Alake.jpg?height=400&width=400",
    shortBio: "Distinguished mining engineer and policy expert leading Nigeria's solid minerals sector transformation.",
    fullBio: `Dr. Dele Alake serves as the Honourable Minister of Solid Minerals Development for the Federal Republic of Nigeria, bringing extensive experience in mining engineering, geological sciences, and natural resources management to Nigeria's solid minerals sector development. A distinguished mining engineer and policy expert, Dr. Alake has dedicated his career to unlocking Nigeria's vast mineral wealth and positioning the solid minerals sector as a key pillar of economic diversification.

Dr. Alake holds advanced degrees in Mining Engineering and Geological Sciences from leading institutions, with additional qualifications in natural resources management and sustainable mining practices. His academic background and technical expertise have equipped him with comprehensive understanding of modern mining technologies, environmental sustainability, and the economic potential of Nigeria's mineral resources.

Before his appointment as Minister, Dr. Alake had a distinguished career in the mining industry, working with both local and international mining companies in various technical and managerial capacities. His experience spans exploration geology, mine planning, operations management, and regulatory compliance, giving him practical insights into all aspects of the mining value chain.

As Minister of Solid Minerals Development, Dr. Alake has focused on comprehensive sector reforms aimed at attracting investment, improving regulatory frameworks, and developing local capacity in the solid minerals sector. His administration has prioritized artisanal mining formalization, large-scale mining promotion, and the development of mineral processing capabilities within Nigeria.

Dr. Alake's vision for Nigeria's solid minerals sector includes positioning it as a major contributor to GDP, creating millions of jobs, and establishing Nigeria as a leading mineral producer in Africa. His approach emphasizes sustainable mining practices, community engagement, technology adoption, and value addition through local processing and beneficiation.

Under his leadership, the Ministry has initiated several strategic programs including the National Integrated Mineral Exploration Programme, the Artisanal and Small-Scale Mining Development Programme, and various initiatives to attract foreign direct investment into the sector. His commitment to transparency and good governance has helped improve Nigeria's ranking in global mining investment attractiveness indices.

Dr. Alake is passionate about ensuring that Nigeria's mineral wealth benefits all citizens through job creation, revenue generation, and sustainable development. His leadership has emphasized the importance of environmental stewardship, community development, and the integration of solid minerals development with broader national economic objectives.`,
    achievements: [
      "Led comprehensive solid minerals sector reforms and policy development",
      "Attracted significant foreign direct investment to Nigeria's mining sector",
      "Implemented artisanal mining formalization programs across Nigeria",
      "Developed strategic partnerships with international mining companies",
      "Advanced sustainable mining practices and environmental compliance",
      "Promoted local content development and mineral processing capabilities",
    ],
    sessions: [
      {
        title: "Town Hall Meeting: 'Solid Minerals as Nigeria's Next Economic Frontier'",
        time: "Friday, Sept 19 | 3:00 PM - 4:00 PM",
        description:
          "Exploring the transformative potential of Nigeria's solid minerals sector for economic diversification and growth",
      },
    ],
  },
  {
    id: "alli-balogun",
    name: "Mr. Jamiu Tolani Alli-Balogun",
    title: "Hon. Commissioner for Education, Lagos State",
    image: "/images/jamiu.jpg?height=400&width=400",
    shortBio:
      "Educational administrator and policy expert driving educational excellence and innovation in Lagos State.",
    fullBio: `Mr. Jamiu Tolani Alli-Balogun serves as the Honourable Commissioner for Education in Lagos State, bringing extensive experience in educational administration, policy development, and institutional management to Lagos State's education sector transformation. A distinguished educational administrator and policy expert, Commissioner Alli-Balogun has been instrumental in advancing educational excellence and innovation across Lagos State's educational institutions.

Commissioner Alli-Balogun holds advanced degrees in Education and Educational Administration from reputable institutions, with additional qualifications in educational policy and management. His academic background and professional experience have equipped him with comprehensive understanding of modern educational systems, curriculum development, and the strategic management of large-scale educational institutions.

Before his appointment as Commissioner, Alli-Balogun had a distinguished career in educational administration, serving in various leadership positions within Lagos State's education system. His experience spans classroom teaching, school administration, district management, and policy development, giving him practical insights into all levels of the educational system.

As Commissioner for Education, Alli-Balogun has focused on comprehensive educational reforms aimed at improving learning outcomes, enhancing teacher quality, and modernizing educational infrastructure across Lagos State. His administration has prioritized digital literacy, STEM education, vocational training, and the integration of technology in teaching and learning processes.

Commissioner Alli-Balogun's vision for Lagos State's education sector includes positioning it as a model for educational excellence in Nigeria, ensuring equitable access to quality education, and preparing students for the challenges of the 21st century economy. His approach emphasizes innovation, continuous improvement, stakeholder engagement, and evidence-based policy making.

Under his leadership, the Ministry of Education has implemented several strategic initiatives including the EKO Digital School project, teacher professional development programs, infrastructure modernization projects, and partnerships with international educational organizations. His commitment to educational equity has led to targeted interventions in underserved communities and the expansion of educational opportunities for all Lagos residents.

Commissioner Alli-Balogun is passionate about ensuring that every child in Lagos State has access to quality education that prepares them for success in life and contributes to the state's continued development. His leadership has emphasized the importance of collaboration between government, private sector, civil society, and international partners in achieving educational transformation.

His expertise in educational policy and administration has been particularly valuable in navigating the complex challenges of managing one of Nigeria's largest state education systems while maintaining high standards and continuous improvement in educational outcomes.`,
    achievements: [
      "Led comprehensive educational reforms across Lagos State school system",
      "Implemented innovative digital learning initiatives and technology integration",
      "Advanced teacher professional development and capacity building programs",
      "Modernized educational infrastructure and learning environments",
      "Promoted STEM education and vocational training programs",
      "Enhanced educational equity and access for underserved communities",
    ],
    sessions: [
      {
        title: "General Session 2 – Policy Roundtable",
        time: "Saturday, Sept 20 | 10:30 AM - 11:30 AM",
        description: "Educational policy perspectives on human capital development and institutional excellence",
      },
    ],
  },
]

const featuredSpeakers = [
  {
    id: "adebayo",
    name: "Dr. Folake Adebayo",
    title: "Director, African Development Institute",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Leading expert in sustainable development and community empowerment across Africa.",
    sessions: [
      {
        title: "Community Empowerment Strategies",
        time: "Friday, Sept 19 | 2:00 PM - 3:00 PM",
      },
    ],
    expertise: ["Sustainable Development", "Community Building", "Social Innovation"],
  },
  {
    id: "johnson",
    name: "Prof. Michael Johnson",
    title: "Cultural Heritage Specialist, UNESCO",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Internationally recognized expert in cultural preservation and heritage management.",
    sessions: [
      {
        title: "Preserving Cultural Heritage in Modern Times",
        time: "Saturday, Sept 20 | 10:00 AM - 11:00 AM",
      },
    ],
    expertise: ["Cultural Preservation", "Heritage Management", "International Relations"],
  },
  {
    id: "williams",
    name: "Mrs. Aisha Williams",
    title: "CEO, Global Youth Leadership Foundation",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Passionate advocate for youth development and leadership training worldwide.",
    sessions: [
      {
        title: "Bridging Generations: Youth Leadership",
        time: "Saturday, Sept 20 | 4:00 PM - 5:00 PM",
      },
    ],
    expertise: ["Youth Development", "Leadership Training", "Mentorship"],
  },
  {
    id: "okafor",
    name: "Dr. Chinedu Okafor",
    title: "Senior Partner, Okafor & Associates",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Distinguished legal practitioner specializing in international law and governance.",
    sessions: [
      {
        title: "Legal Frameworks for Community Organizations",
        time: "Sunday, Sept 21 | 9:00 AM - 10:00 AM",
      },
    ],
    expertise: ["International Law", "Corporate Governance", "Legal Consulting"],
  },
  {
    id: "thompson",
    name: "Ms. Grace Thompson",
    title: "Director of Operations, Diaspora Connect",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Expert in diaspora engagement and international community building.",
    sessions: [
      {
        title: "Strengthening Diaspora Networks",
        time: "Sunday, Sept 21 | 3:00 PM - 4:00 PM",
      },
    ],
    expertise: ["Diaspora Relations", "International Networks", "Community Engagement"],
  },
  {
    id: "ibrahim",
    name: "Dr. Amina Ibrahim",
    title: "Health Policy Advisor, WHO Africa",
    image: "/placeholder.svg?height=300&width=300",
    shortBio: "Leading public health expert focused on community health and wellness programs.",
    sessions: [
      {
        title: "Community Health and Wellness",
        time: "Friday, Sept 19 | 4:00 PM - 5:00 PM",
      },
    ],
    expertise: ["Public Health", "Health Policy", "Community Wellness"],
  },
]

export default function SpeakersPage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <TopBar isScrolled={isScrolled} />
      <Header isScrolled={isScrolled} />

      {/* Hero/Banner Section */}
      <section
        className="relative text-white py-8 sm:py-12 md:py-16 lg:py-20"
        style={{
          backgroundImage: "url('/images/speakers-banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-blue-600/70 to-teal-500/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-[190px] sm:pt-[130px] md:pt-[140px] lg:pt-[150px]">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl italic text-white/90 mb-3 sm:mb-4"
            >
              Meet our distinguished guests
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg leading-tight"
            >
              Featured Speakers
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl"
            >
              Join us for inspiring presentations from visionary leaders, innovators, and change-makers who are shaping
              the future of our communities and the world.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Keynote Speakers Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">
              Keynote Speakers
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              Our distinguished keynote speakers bring decades of leadership experience and visionary insights to
              ECI@25.
            </p>
          </motion.div>

          <div className="space-y-16 sm:space-y-20">
            {keynoteSpeakers.map((speaker, index) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Speaker Image */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative">
                    <img
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                    <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2 leading-tight">
                        {speaker.name}
                      </h3>
                      <p className="text-white/90 text-sm sm:text-base md:text-lg leading-tight">{speaker.title}</p>
                    </div>
                  </div>
                </div>

                {/* Speaker Content */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">Biography</h4>
                      <div className="text-sm sm:text-base text-gray-600 leading-relaxed space-y-3 sm:space-y-4">
                        {speaker.fullBio
                          .split("\n\n")
                          .slice(0, 2)
                          .map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Key Achievements</h4>
                      <ul className="space-y-2 sm:space-y-3">
                        {speaker.achievements.map((achievement, aIndex) => (
                          <li key={aIndex} className="flex items-start space-x-2 sm:space-x-3">
                            <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-gray-600 leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Speaking Sessions</h4>
                      <div className="space-y-3 sm:space-y-4">
                        {speaker.sessions.map((session, sIndex) => (
                          <div
                            key={sIndex}
                            className="bg-gradient-to-r from-purple-50 to-teal-50 p-4 sm:p-6 rounded-lg"
                          >
                            <h5 className="text-base sm:text-lg font-bold text-gray-800 mb-2">{session.title}</h5>
                            <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span>{session.time}</span>
                              </div>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{session.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        style={{
          backgroundImage: "url('/images/circle-scatter-haikei.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="py-12 sm:py-16 md:py-20 text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Don't Miss These Inspiring Sessions
            </h2>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed px-4">
              Join us for three days of transformative discussions, networking, and learning from some of the most
              influential leaders of our time.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
              <Button
                size="lg"
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg w-full sm:w-auto"
              >
                <Link href={"/register"}>Register Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-white/10 backdrop-blur-sm w-full sm:w-auto"
              >
                <Link href={"/agenda"}>View Full Agenda</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
