/* eslint-disable no-tabs */
/* eslint-disable max-len */
import {
  StyleSheet, View, ScrollView, Text, Dimensions, Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTailwind } from 'tailwind-rn';
import { verticalScale, moderateScale } from 'react-native-size-matters';

const defaultGradient = ['rgba(255, 255, 255,0.8)', 'rgba(76, 187, 23,0.1)'];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    paddingHorizontal: 30,
  },
  nestedScrollView: {
    height: Dimensions.get('window').height / 1.1,
  },
  headingText: {
    fontSize: verticalScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(24),
    color: '#435A71',
  },
  sectionTitleText: {
    fontSize: moderateScale(20),
    color: '#435A71',
  },
  text: {
    fontSize: verticalScale(12.5),
    lineHeight: verticalScale(20),
  },
  textSmall: {
    fontSize: moderateScale(10),
  },
  sectionTitleTextSmall: {
    fontSize: moderateScale(14),
    color: '#435A71',
  },
  lightParagraph: {
    color: '#8A9AA4',
  },
  paragraph: {
    marginBottom: 12,
  },
});

function ReadTerms() {
  const tailwind = useTailwind();
  return (
    <LinearGradient
      colors={defaultGradient}
      style={[tailwind('justify-start pt-8 mb-3'), styles.container]}
      start={{ x: 0.0, y: 0.1 }}
      end={{ x: 0, y: 5 }}
      locations={[0, 1]}
    >
      <ScrollView
        style={[styles.nestedScrollView, { marginVertical: 10 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={tailwind('my-3')}>
          <Text style={[tailwind('text-2xl font-medium text-text my-3'), styles.sectionTitleText]}>Welcome to Red Green Life Design Ltd.</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We are passionate about helping you live your life on your terms. These Terms and Conditions of Use are the rules of the game - designed to create a positive, law-abiding community of our users. By using Red Green Life Design’s products and services, you are agreeing to all the terms below.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Red Green Life Design LLC., offer a variety of products and services, including the Red Green App (collectively, the “Services”).
            THESE TERMS INCLUDE A BINDING ARBITRATION CLAUSE AND A CLASS ACTION WAIVER IN SECTION 15. THIS PROVISION AFFECTS YOUR RIGHTS TO RESOLVE DISPUTES WITH RED GREEN LIFE DESIGN AND YOU SHOULD REVIEW IT CAREFULLY. YOUR CHOICE TO MAINTAIN AN ACCOUNT, ACCESS OR USE THE SERVICES (REGARDLESS OF WHETHER YOU CREATE AN ACCOUNT WITH US) CONSTITUTES YOUR AGREEMENT TO THESE TERMS AND OUR PRIVACY POLICY, WHICH IS INCORPORATED INTO THE TERMS. IF YOU DISAGREE WITH ANY PART OF THE TERMS, THEN YOU ARE NOT PERMITTED TO USE OUR SERVICES.
            Please note that by accessing or using our Services, your Personal Data (as that term is defined in the Privacy and User-Generated Content (defined below) that you share with one part of the Service may also be shared among the entirety of Red Green Life Desing and its Services.
            Please note the summaries in shaded boxes at the top of most sections are provided to make the Terms easier to understand. In the event of a conflict between any summary and any section of the Terms, the Terms will control.
            Please feel free to contact us through our Support Team if you have any questions or suggestions.
          </Text>

        </View>
        <View style={tailwind('my-3')}>
          <Text style={[tailwind('text-2xl font-medium text-text my-3'), styles.sectionTitleText]}>1. Use of the Services and Your Account</Text>
          {/* -------- 1.1 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>1.1 Who can use the Red Green Life Design Services</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Red Green welcomes users of all ages, but you must be at least 18 to use the Red Green App.
            You must be at least 18 to use the Red Green App (unless otherwise specified in the International Terms section applicable to specific jurisdictions). No individual under these age limits may use the Services, provide any Personal Data to Red Green Life Design, or otherwise submit Personal Data through the Services (e.g., a name, address, telephone number, or email address).
          </Text>
          {/* -------- 1.2 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>1.2 Your Account</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You may need to create an Red Green account to access the Services, and it&apos;s important that the information associated with your account is accurate and up-to-date (particularly your email address - if you ever forget your password, a working email address is often the only way for us to verify your identity and help you log back in).
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You may need to register for an Red Green account to access or use certain Services. Your account may also automatically provide you access and means to use any new Services.
            When you create an account for any of our Services, you must provide us with accurate and complete information as prompted by the account creation and registration process and keep that information up to date. Otherwise, some of our Services may not operate correctly, and we may not be able to contact you with important notices.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You are responsible for maintaining the confidentiality of any and all actions that take place while using your account, and must notify our Support Team Support Team right away of any actual or suspected loss, theft, or unauthorized use of your account or account password. We are not responsible for any loss that results from unauthorized use of your username and password.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are a resident of the European Union: You have the right to delete your account with us by contacting our Support Team. If you choose to permanently delete your account, the non-public Personal Data that we have associated with your account will also be deleted.
          </Text>
          {/* -------- 1.3 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>1.3 Service Updates, Changes and Limitations</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You may need to create an Red Green account to access the Services, and it&apos;s important that the information associated with your account is accurate and up-to-date (particularly your email address - if you ever forget your password, a working email address is often the only way for us to verify your identity and help you log back in).
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            The Services change frequently, and their form and functionality may change without prior notice to you.
            We may provide updates (including automatic updates) for certain Services as and when we see fit. This may include upgrades, modifications, bug fixes, patches and other error corrections and/or new features (collectively, “Updates”). Certain portions of our Services may not properly operate if you do not install all Updates. You acknowledge and agree that the Service may not work properly if you do not allow such Updates and you expressly consent to automatic Updates. Further, you agree that the Terms (and any additional modifications of the same) will apply to any and all Updates to the Services. We may change, suspend, or discontinue any or all of the Services at any time, including the availability of any product, feature, database, or Content. In addition, we have no obligation to provide any Updates or to continue to provide or enable any particular features or functionality of any Service. We may also impose limits on certain Services or restrict your access to part or all of the Services without notice or liability.
          </Text>
          {/* -------- 1.4 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>1.4 Service Monitoring and Suspension</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We reserve the right to refuse to provide the Services to anyone, and can monitor, terminate or suspend your account or access to the Services at any time.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We reserve the right, but have no obligation, to monitor any accounts and/or activities conducted through or in any way related to the Services (including inviting a fellow user into a community or group), as well as any user’s use of or access to Personal Data, and profiles of other users.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We may also deactivate, terminate or suspend your account or access to certain Services at any time: (1) if we, in our sole discretion, determine you are or have been in violation of these Terms or the spirit thereof (as highlighted in our Community Guidelines), (2) if we, in our sole discretion, determine you have created risk or possible legal exposure for Red Green, the general public, any third party, or any user of our Services, (3) in response to requests by law enforcement or other government agencies, (4) upon discontinuation or material modification of any Services, or (5) due to unexpected technical issues or problems. We will endeavor to notify you by email or the next time you attempt to access your account after any such deactivation, termination or suspension.
          </Text>
          {/* -------- 1.5 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>1.5 Security</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Please let us know right away if you believe your account has been hacked or compromised.
            We care about the security of our users. While we work hard to protect the security of your Personal Data, User-Generated Content, and account, we cannot guarantee that unauthorized third parties will not be able to defeat our security measures. Please notify our Suport Team Support Team immediately of any actual or suspected breach or unauthorized access or use of your account.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          <Text style={[tailwind('text-2xl font-medium text-text my-3'), styles.sectionTitleText]}>2. Ownership and Use of Content</Text>
          {/* -------- 2.1 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.1 Definitions</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Content is what shows up on your display when you use our Services. User-Generated Content is any Content that is created by you or other users, and RG Content is all other Content.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            For purposes of these Terms, (i) “Content” means any form of information, data or creative expression and includes, without limitation, video, audio, photographs, images, illustrations, animations, tools, text, ideas, communications, replies, “likes,” comments, software, scripts, executable files, graphics, maps, routes, geo-data, workouts and workout data, biometric data and data elements derived therefrom, training plans, sleep activity, annotations, nutrition information, recipes, interactive features, designs, copyrights, trademarks, service marks, branding, logos, and other similar assets, patents, sounds, applications and any intellectual property therein, any of which may be generated, provided, or otherwise made accessible on or through the Services; (ii) “User-Generated Content” means any Content that a user submits, transfers, or otherwise provides to or through the use of the Services; and (iii) “RG Content” means all Content that is not User-Generated Content.
          </Text>
          {/* -------- 2.2 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.2 Ownership</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You own the Content that you create, and we own the Content that we create.
            All RG Content and all copyright, trademarks, design rights, patents and other intellectual property rights (registered and unregistered) in and on the Services belong to Red Green and/or its partners or applicable third parties. Each user retains ownership, responsibility for, and/or other applicable rights in the User-Generated Content that he/she creates, but grants a license of that User Generated Content to Red Green as explained in Section 2.5 below. Red Green and/or its partners or third parties retain ownership, responsibility for and/or other applicable rights in all RG Content. Except as expressly provided in the Terms, nothing grants you a right or license to use any RG Content, including any content owned or controlled by any of our partners or other third parties. You agree not to duplicate, publish, display, distribute, modify, or create derivative works from the material presented through the Services unless specifically authorized in writing by Red Green.
          </Text>

          {/* -------- 2.3 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.3 Our License to You</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You are welcome to access and use the RG Content and Services. We work hard to provide a great experience for our users, so please respect our intellectual property rights and only use the RG Content and Services as intended. This includes not using any Rg Content or Services for commercial purposes without our permission. We do have APIs and other tools you can use to help create your own apps and products. Contact us to find out more.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Subject to your compliance with these Terms, we grant you a limited, revocable, personal, non-transferable, and non-exclusive right and license to access and use the Services and RG Content for your own personal, noncommercial purposes, provided that you do not (and do not allow any third party to) copy, modify, create a derivative work from, reverse engineer, sell, assign, sublicense, grant a security interest in, transfer or otherwise commercially exploit any right in the RG Content or Services.
          </Text>
          {/* -------- 2.4 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.4 Acceptable Usage Guidelines</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            2.4.1 RG Content. Except as expressly permitted by applicable law or authorized by Red Green, you agree not to modify, rent, lease, loan, sell, distribute, or create derivative works based on the Services, the Services’ software, or any RG Content offered as part of the Services (other than User-Generated Content), in whole or in part. You shall not download, copy, or save RG Content, except (i) as expressly permitted by the functionality of certain Services (e.g., printed maps) as provided for in the specific guidelines and/or additional terms applicable to those Services, or (ii) solely for personal use or your records.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            2.4.2 Commercial Usage of the Services. The Services, with the exception of certain products and services provided though the Red Green-branded websites and certain widgets we make available as tools for website owners (collectively, the “Commercial Tools”), are intended only for your personal, non-commercial use. You shall not use the Services (other than certain Commercial Tools) to sell a product or service, increase traffic to your own website or a third-party website for commercial reasons (such as advertising sales), or otherwise undertake any endeavor aimed at deriving revenue. For example, you shall not take the results from a search of the Services and reformat and display them, or mirror our home pages or results pages on your website. Moreover, you shall not “meta-search” our Services. If you seek to make commercial use of the Services other than through the Commercial Tools, you must enter into an agreement with us to do so in advance. To learn more about the Commercial Tools, please visit our Developer Portal Developer Portal. By using any of the Commercial Tools, you acknowledge and agree to the Terms and any additional terms and conditions applicable to those select Services.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            2.4.3 Linking to the Services. If you would like to link to our Services on your website or application, please follow these rules: (i) any link to the Services must be a text only link clearly marked “Red Green” (without the use of any other trademark, logo copyright or any other intellectual property asset owned or controlled by Red Green) or in some other format directed by Red Green, (ii) the appearance, position and other aspects of the link may not damage or dilute the goodwill associated with our marks, (iii) the link must “point” to the root domain name of the Services and not to other pages within the Services, (iv) the appearance, position and other attributes of the link may not create the false appearance that your organization or entity is sponsored by, affiliated with, or associated with Red Green, (v) when selected, the link must display the Service on full-screen and not within a “frame” on the linking website or service, and (vi) Red Green reserves the right to revoke its consent to the link at any time and in its sole discretion, and upon our notification to you of such revocation of consent, you agree to promptly remove the relevant link.
          </Text>
          {/* -------- 2.5 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.5 Your License to Us</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            When you post Content in connection with the Services, it belongs to you - however, you&apos;re giving us permission to use that Content in connection with our Services and make the Content available to others. We can edit or remove your Content from our Services at any time for any reason. Don&apos;t post any content that is not yours or that you do not have permission to post.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            When you provide User-Generated Content to Red Green through the Services, you grant Red Green and our users a non-exclusive, irrevocable, royalty-free, freely transferable, sublicensable, worldwide right and license to use, host, store, cache, reproduce, publish, display (publicly or otherwise), perform (publicly or otherwise), distribute, transmit, modify, adapt (including, without limitation, in order to conform to the requirements of any networks, devices, services, or media through which the Services are available), commercialize, create derivative works of, and otherwise exploit such User-Generated Content in connection with any and all Services. You acknowledge and agree that: (a) we have the right to arrange the posting of User-Generated Content in any way we desire; (b) Red Green has no obligation to provide you with any credit when using your User-Generated Content, but if Red Green chooses to provide you with credit, the size and placement of the credit is at our sole discretion; and © you are not entitled to any compensation or other payment from us in connection with the use of your User-Generated Content.
            The rights you grant in this license are for the limited purposes of allowing Red Green to operate and allow other users to use the Services in accordance with their functionality, improve the Services, and develop new Services. Notwithstanding the above, we will not make use of any of your User-Generated Content in a manner that is inconsistent with the privacy settings privacy settings you establish within our Services. For information on managing your privacy settings for the Services, see the Privacy Policy. Privacy Policy.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We reserve the right to monitor, remove or modify User-Generated Content for any reason and at any time, including User-Generated Content we believe violates these Terms, the Community Guidelines, and/or our policies.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You agree you will respect the intellectual property rights of others. You represent and warrant you have all the necessary rights to grant Red Green the foregoing license for all User-Generated Content you submit in connection with the Services and will indemnify us for any breach of this representation and warranty.
          </Text>
          {/* -------- 2.6 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.6 Spreading the Word</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you share someone else&apos;s personal information with us, you must first get their permission.
            We hope you enjoy using our Services and encourage you to share your enthusiasm for them with your friends. If you elect to use the features in our Services to tell a friend about the Services, we will ask you to provide your friend’s email address or social media profile, which we may then use to contact your friend about the Services. We may store the information you provide for a period of time, but we will not post this information publicly. You represent and warrant that you are authorized to provide any third-party contact information that you provide to us for referrals and will indemnify us for any breach of this representation and warranty.
          </Text>
          {/* -------- 2.6 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.6 Spreading the Word</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you share someone else&apos;s personal information with us, you must first get their permission.
            We hope you enjoy using our Services and encourage you to share your enthusiasm for them with your friends. If you elect to use the features in our Services to tell a friend about the Services, we will ask you to provide your friend’s email address or social media profile, which we may then use to contact your friend about the Services. We may store the information you provide for a period of time, but we will not post this information publicly. You represent and warrant that you are authorized to provide any third-party contact information that you provide to us for referrals and will indemnify us for any breach of this representation and warranty.
          </Text>
          {/* -------- 2.7 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.7 Content Retention</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Please keep in mind that when you make something publicly available on the Internet, it becomes practically impossible to take down all copies of it in the future.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Following termination of your account, or if you remove any User-Generated Content from the Services, we may retain your User-Generated Content for a commercially reasonable period of time for backup, archival, or audit purposes, or as otherwise required or permitted by law. Furthermore, Red Green and its users may retain and continue to use, store, display, reproduce, share, modify, create derivative works, perform, and distribute any of your User-Generated Content that otherwise has been stored or shared through the Services. Accordingly, note that the above license to your User-Generated Content continues even if you stop using the Services. When you post something publicly, others may choose to comment on it, making your Content part of a social conversation. For more information, please review our Privacy Policy. Privacy Policy.
          </Text>
          {/* -------- 2.8 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.8 User-Generated Content and Eligibility to Participate in Certain Sports Organizations</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Things that happen online may have consequences in the real world.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Certain sports organizations have rules on amateurism and eligibility that could potentially be implicated if you post User-Generated Content within the Services, even if you believe it is noncommercial in nature. It is your responsibility to determine whether posting such content within the Services will affect your eligibility to participate in any sport under any applicable rules of any sports organization.
          </Text>
          {/* -------- 2.9 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>2.9 Your Feedback</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We appreciate your feedback and can freely use your suggestions to make Red Green and users around the world better. Thank you and keep the ideas coming!
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you choose to submit comments, ideas or feedback, you should submit the idea through our Idea Submission website, and you agree that we are free to use the ideas you submit without any restriction or compensation to you. By accepting your submission, Red Green does not waive any rights to use similar or related feedback previously known to Red Green, developed by our employees, or obtained from sources other than you. You certify and represent that the information or feedback you submit to us through the Services is not confidential or proprietary information.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          <Text style={[tailwind('text-2xl font-medium text-text my-3'), styles.sectionTitleText]}>3. Community Guidelines</Text>
          {/* -------- 3.1 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>3.1 Interactive Areas</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Our Services often contain community features. When you post content through these features that content may become public. We may, but do not always, monitor our community features, and ultimately you are responsible for your interactions with other users. Please use good judgment and play fair.
            Some of our Services may include reviews, discussion forums, conversation pages, blogs or other interactive areas or social features that allow you and other users to post User-Generated Content and interact with one another (“Interactive Areas”). You are solely responsible for your use of the Interactive Areas and for any User-Generated Content you post, including the transmission, accuracy and completeness of the User-Generated Content. As the Interactive Areas are often public, you understand your User-Generated Content may be made and remain public. You should, accordingly, never post any Personal Data in an Interactive Area.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We are entitled, but have no obligation, to monitor our community features. You are solely responsible for your interactions with other users, whether online or in person, including but not limited to comments, challenges, and friendly competition. We assume no responsibility or liability for any loss or damage resulting from any interaction with other users who employ the Services, individuals you meet through the Services, or individuals who find you because of Content posted on, by or through the Services. Red Green is under no obligation to become involved in and disclaims all liability related to any disputes between its users and you release Red Green from all responsibility and liability arising out of or in connection with such dispute.
          </Text>
          {/* -------- 3.2 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>3.2 Community Guidelines</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Our Services are intended to be a safe and supportive environment to help you reach your fitness and wellness goals. You cannot use our services to post inappropriate material, harass people, send spam, violate intellectual property rights, or act inappropriately. Be reasonable and act responsibly.
            {'\n'}

            Our Services are intended to create a safe and supportive community for all users. To maintain a safe and positive environment, we require everyone to agree to and follow certain rules (the “Community Guidelines”) when posting User-Generated Content and using the Services. Our Community Guidelines are based in many instances on principles of applicable law. Violations of our Community Guidelines accordingly may expose you to criminal charges and civil liability. By using the Services you agree that your User-Generated Content and use of the Services, including without limitation the Interactive Areas, will not violate the Community Guidelines. If you violate the Community Guidelines, we reserve the right to terminate your access to the Services.
            {'\n'}
            •	No Inappropriate Content. Don’t post Content that is stalking, threatening, hurtful, harassing, abusive, or embarrassing to other members of the community. No derogatory references to sex, gender, age, weight, body type, disability, ethnicity, religion, or sexual orientation, or endorsement of violence against any person or group, even if couched in humor, will be permitted. This includes expressing stereotypes about any group or community. Don’t post Content that is defamatory, obscene, pornographic, offensive, hateful, inflammatory, or that promotes sexually explicit material. You can respectfully disagree with a message, post or topic, but please do not attack other users by mocking or insulting them. If you are attacked by another user, and you reciprocate, you may also be subject to the same consequences.
            {'\n'}
            •	No Hijacking, Trolling, or Flame-baiting. If you are participating in our forums, please stay on-topic in an existing thread, and post new threads in the appropriate forum. Taking a thread off-topic is considered hijacking. This includes posts that provoke or are intended to incite uproar.
            {'\n'}
            •	No Promotion of Unsafe Weight-Loss Techniques or Eating Disorders. Use of the Services to promote, glamorize, or achieve dangerously low levels of eating is not permitted. Accordingly, please do not contribute the following types of Content, which may be removed without warning:
            {'\n'}
            •	Content intended to promote potentially unsafe or controversial weight loss products or procedures, including non-medically prescribed supplements or MLM.
            {'\n'}
            •	Profiles, groups, messages, posts, or wall comments that encourage anorexia, bulimia, or very low calorie diets. This includes positive references to ana/mia, purging, or self-starving.
            {'\n'}
            •	Photos intended to glamorize extreme thinness.
            {'\n'}
            •	No Harm to Minors. Don’t use the Services in a way that harms minors (or anyone, really).
            {'\n'}
            •	No Disruptions, Exploits, or Resource Abuse. Do not interfere with or damage operation of the Services, including through unauthorized use, disruption, automated attacks, exploitation, or abuse of our resources
            {'\n'}
            •	No Sending Spam and Junk Mail. Don’t spam people via posts, replies, or messages.
            {'\n'}
            •	No Illegal Content. Don’t advocate, promote, or assist any fraudulent or illegal act (e.g., violence, impersonation and computer misuse).
            {'\n'}
            •	No Soliciting Personal Data. Please don’t post or solicit Personal Data regarding or from any third party, including photographs, telephone numbers, street addresses, last names, email addresses and passwords in the Interactive Areas.
            {'\n'}
            •	No Public Posting of Private Conversations. Don’t publicly post an email or private message from any other user, moderator or administrator.
            {'\n'}
            •	No Breach of Legal Duty. Don’t post Content in breach of any contractual or other legal duty owed to a third party.
            {'\n'}
            •	No Deceptive or Fraudulent Links. Don’t post deceptive or fraudulent links. This includes links with misleading descriptions, putting the wrong “source” field in a post, setting misleading click-through links on images, or embedding links to interstitial or pop-up ads.
            {'\n'}
            •	No Intellectual Property Infringement. Respect the intellectual property of others. If you aren’t allowed to use someone else’s proprietary work or likeness (either by license or by legal exceptions and limitations such as fair use), please don’t post it. In particular, if you have any reason to believe User-Generated Content you see on our Services is infringing your intellectual property or the intellectual property of others, please see the Intellectual Property/DMCA section of our Terms.
            {'\n'}
            •	No Impersonating Red Green or Others. Don’t post Content that is likely to deceive any person or be used to impersonate any person, or to misrepresent your identity or affiliation with any person, including with Red Green. Creating an account for the purposes of deceiving other users or to work around a suspension is not permitted and will be grounds for a permanent ban from the Services.
            {'\n'}
            •	No Automated Querying. Do not send automated queries of any sort to the systems and networks we use to provide the Services without our express written permission.
            {'\n'}
            •	Other. Don’t post Content that contains anything that, in Red Green’s sole determination, is objectionable or inhibits any other person from using or enjoying the Services, or that may expose Red Green or our users to any harm or liability of any kind. Don’t post content that may damage or dilute the goodwill associated with Red Greens or our marks.
            If we determine you are violating the Community Guidelines or otherwise have breached the Terms, we may take actions to address the issue, including, but not limited to, terminating your right to use the Services, removing your User-Generated Content, taking legal action against you (in which case you agree that we may recover reasonable costs and attorneys’ fees) or disclosing information to law enforcement authorities. We reserve the right to enforce, or not enforce, these Community Guidelines in our sole discretion, and they don’t create a duty or contractual obligation for us to act in any particular manner

          </Text>
          {/* -------- 3.3 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>3.3 Reporting Objectionable User-Generated Content</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            People do post inappropriate content on user-generated content sites. We do our best to keep the community safe and secure (users respecting the Community Guidelines helps), but you still might run into bad content before we have a chance to take it down. If you spot anything objectionable, please let us know.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            While we require all of our users to comply with the Community Guidelines and reserve the right to monitor for violations, we ultimately cannot guarantee all users will comply with the Community Guidelines or these Terms at all times. If you believe any Content submitted to our Services violates the Community Guidelines, or if you know or suspect someone is misusing your User-Generated Content, please report it to the Support Team Support Team. We have the right, but not the obligation, to review and take action or remove any User-Generated Content you report. You understand and acknowledge that when you access or otherwise use the Services, you may be exposed to User-Generated Content from a variety of sources, and we are not responsible for the accuracy, usefulness, safety, legality, appropriateness, or intellectual property rights of or relating to such User-Generated Content.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We are not responsible or liable for any injury or harm to you resulting from objectionable User-Generated Content or another user’s failure to comply with our Community Guidelines.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 4.0 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>4. Intellectual Property/ DMCA</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We respect intellectual property laws. If anything is wrong, please send an email with all the details to ___@email________.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you believe User-Generated Content or UA Content infringes copyright or trademark under U.S. or other national law, please notify our us immediately using the contact information provided herein. It is our policy to investigate any allegations of infringement brought to our attention. Please provide us with the following information in your notice of a suspected violation:
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            •	Identification of the material being infringed.
            {'\n'}
            •	Identification of the material that is claimed to be infringing, including its location, with sufficient detail so that we are capable of finding it and verifying its existence.
            {'\n'}
            •	Contact information for the notifying party (the “Notifying Party”), including name, address, telephone number, and email address.
            {'\n'}
            •	A statement that the Notifying Party has a good faith belief that the material is not authorized by the owner, its agent or law.
            {'\n'}
            •	A statement made under penalty of perjury that the information provided in the notice is accurate and that the Notifying Party is authorized to make the complaint on behalf of the owner.
            {'\n'}
            •	A physical or electronic signature of a person authorized to act on behalf of the owner of the material that has been allegedly infringed.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Your notice must be signed (physically or electronically) and must be addressed as follows:
            {'\n'}
            Copyright Agent
            {'\n'}
            c/o Red Green Ltd.
            {'\n'}
            Address:
            {'\n'}
            Email address
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You acknowledge that if you fail to comply with all of the requirements of this section, your notice may not be valid. Some information provided in a notice of infringement may be forwarded to the user who posted the allegedly infringing content. In the U.S., under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability. Please see
            {' '}
            <Text
              style={{ color: 'blue' }}
              onPress={() => Linking.openURL('https://copyright.gov')}
            >
              copyright.gov
            </Text>
            {' '}
            for more information about how to prepare or respond to a DMCA notice and/or
            {' '}
            <Text
              style={{ color: 'blue' }}
              onPress={() => Linking.openURL('https://uspto.gov/trademark')}
            >
              uspto.gov/trademark
            </Text>
            {' '}
            for more information about trademark rights.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 5.0 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>5. Third Party Links and Services</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Our Services may link to, interact with or be available on third-party services or products such as social media and third-party devices. If you access such third-party services or products, be aware that different terms and privacy policies apply to your usage of such services.
          </Text>
          {/* -------- 5.1 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>5.1 Social Networking and Logins</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You may enable or log in to the Services via various online third-party services, such as social media and social networking services like Facebook or Twitter (“Social Networking Services”). To take advantage of these features and capabilities, we may ask you to authenticate, register for, or log into Social Networking Services on the websites of their respective providers. As part of this integration, the Social Networking Services will provide us with access to certain information you have provided to them, and we will use, store, and disclose such information in accordance with our Privacy Policy. Please remember the way Third Party Services (including Social Networking Services) use, store, and disclose your information is governed solely by the policies of those Third Party Services, and we have no liability or responsibility for the privacy practices or other actions of any third-party website or service that may be enabled within the Services. In addition, we are not responsible for the accuracy, availability, or reliability of any information, content, goods, data, opinions, advice, or statements made available in connection with Social Networking Services. As such, we are not liable for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such Social Networking Services.
          </Text>
          {/* -------- 5.2 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>5.2 Third-Party Applications</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You may be able to access certain third-party links, applications, content, services, promotions, special offers, or other events or activities (“Third-Party Applications”) via our Services. If you choose to access these Third-Party Applications, you may be requested to log-in and sync your accounts with such applications. You are in no way obligated to use any Third-Party Applications, your access and use of such applications is entirely at your own risk, and we have no associated liability. In addition, we are not responsible for the accuracy, availability, or reliability of any information, content, goods, data, opinions, advice, or statements made available by any Third-Party Applications. As such, we are not liable for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such Third-Party Applications.
          </Text>
          {/* -------- 5.3 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>5.3 Third Party Products</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Our Services may be accessed on third-party devices or other products (“Third Party Products”), and your ability to use certain features of the Services may require you to purchase Third-Party Products (e.g., fitness trackers). While we may recommend, promote, or market the products of certain partners, we have no responsibility for your acquisition or use of any Third-Party Products, and we do not guarantee that Third-Party Products will function with the Services or will be error-free. We hereby disclaim liability for all Third-Party Products, including any Third-Party Products offered by our partners.
          </Text>
          {/* -------- 5.4 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>5.4 Third-Party Services, Activities, and Events</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Our Services may include the ability to discover, access or participate in certain services, activities, or events (“Third-Party Activities”). Third-Party Activities are offered and provided by Third Parties, not Red Green. Your attendance at and participation in Third-Party Activities is solely at your own risk. Red Green will not be liable for any act, error or omission of any Third Party, including, without limitation, any which arises out of or is any way connected with a user’s attendance, use of or participation in any Third-Party Activities initially discovered, booked or registered for via the Services, or the performance or non-performance of any Third Party in connection with the Services. Red Green is not an agent of any provider of Third-Party Activities.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 6.0 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>6. Mobile Services</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            While we strive to make our applications available on many platforms, we can&apos;t guarantee that our applications are compatible with your device (though please let Customper Customer Support know if you have a question or problem; we want to help). If you use our applications, your standard data and messaging rates will apply, and the rules of the app store from which you are downloading will also apply.
          </Text>
          {/* -------- 6.1 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>6.1 Wireless Carrier and Device Considerations</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            To use or access our applications, you will need a compatible device. We cannot guarantee the applications will be compatible with, or available on, your device. We do not charge for use of some basic applications; however, you may need to pay fees to use certain premium applications or features. Further, your phone company’s normal messaging, data, and other rates and fees will still apply.
          </Text>
          {/* -------- 6.2 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>6.2 Text and Mobile Messaging Express Consents</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            By downloading or using our applications, you expressly agree we may communicate with you regarding transactions you have initiated on the Services or respond to your communications to us through the Services by SMS, MMS, text message, or other electronic means directed to your device and that certain information about your usage of the applications may be communicated to us automatically form your device. We will not send you direct messages of a marketing nature without your prior express written consent and you can opt out of receiving any marketing messages from us at any time.
          </Text>
          {/* -------- 6.3 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>6.3 Mobile Application License</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We hereby grant you a limited, personal, non-exclusive, non-transferable, non-sublicensable, revocable license to use our applications downloaded directly from a legitimate marketplace, solely in object code format and solely for your personal use for lawful purposes. With respect to any open source or third-party code that may be incorporated in the applications, such open source code is covered by the applicable open source or third-party license EULA, if any, authorizing use of such code.
          </Text>
          {/* -------- 6.4 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>6.4 App Stores</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you download our applications from a third-party app store (the “App Provider”), you acknowledge and agree that:
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            •	The Terms are an agreement between us, and not with the App Provider. As between Red Gree and the App Provider, Red Green is solely responsible for its applications;
            {'\n'}
            •	The App Provider has no obligation to provide any maintenance and support services with respect to the Red Green applications;
            {'\n'}
            •	In the event of any failure of the Red Green applications to conform to any applicable warranty, (i) you may notify the App Provider and the App Provider may refund the purchase price for the applications to you (if applicable), (ii) to the maximum extent permitted by applicable law, the App Provider will have no other warranty obligation whatsoever with respect to the applications, and (iii) any other claims, losses, liabilities, damages, costs or expenses attributable to any failure to conform to any warranty will be, as between Red Green and the App Provider, Red Green’s responsibility;
            {'\n'}
            •	The App Provider is not responsible for addressing any claims you have relating to the applications or your possession and use of the applications;
            {'\n'}
            •	If a third party claims an application infringes another party’s intellectual property rights, as between the App Provider and Red Green, Red Green will be responsible for the investigation, defense, settlement and discharge of any such claim to the extent required by these Terms;
            {'\n'}
            •	The App Provider and its subsidiaries are third-party beneficiaries of these Terms as it relates to your license to the applications. Upon your acceptance of these Terms, the App Provider will have the right (and will be deemed to have accepted the right) to enforce these Terms as related to your license of the applications against you as a third-party beneficiary thereof; and
            {'\n'}
            •	You must also comply with all applicable third-party terms of service when using the applications.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 7.0 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>7.1 Payment Terms</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you choose to subscribe to any of our enhanced, paid services, these are the payment and billing terms that apply. Paid services and billing may auto-renew unless you cancel. You may cancel at any time.
          </Text>
          {/* -------- 7.1 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>7. Paid Services</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We offer certain premium versions of the Services (the “Premium Services”) for a fee. By signing up for and using the Premium Services, you agree to our Terms, and any additional terms and conditions provided here. You also agree to waive your 14-day right of withdrawal at the moment you subscribe to the Premium Services to the maximum extent permitted by applicable law, so that you are able to immediately access them.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            The Premium Services provide you access to certain enhanced products, services, features and functionality (e.g., premium graphs and analysis, an ad-free browsing experience). By signing up for and using the Premium Services, including signing up for Free Trials of the Premium Services, you agree to pay any fees or other incurred charges that apply to the Premium Services (such as subscription fees).
            When you sign up for the Premium Services, you must designate and provide information about your preferred payment method (“Payment Method”). This information must be complete and accurate, and you are responsible for keeping it up to date. You expressly authorize us to collect via automatic debit or ACH from your Payment Method the appropriate fees charged for the Premium Services and for any other purchases you elect to make via the Services.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You can choose to pay for the Premium Services on a monthly or annual basis. Unless otherwise stated, all fees due for the Premium Services are payable in advance, and will be billed automatically to the Payment Method at the start of the monthly or annual Premium Service period, as applicable. Unless otherwise stated, Premium Services will auto-renew until you elect to cancel your access to Premium Services. All purchases of Premium Services are final and non-refundable, except at our sole discretion and in accordance with the rules governing each Premium Service.
          </Text>
          {/* -------- 7.2 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>7.2 Termination or Cancellation of Premium Services</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you do not pay the fees or charges due for your use of the Premium Services, we may make reasonable efforts to notify you and resolve the issue; however, we reserve the right to disable or terminate your access to the Premium Services (and may do so without notice).
            You can cancel the Premium Services at any time. More information on how to cancel can be found here here. Once you have cancelled your Premium Service and received confirmation, no other changes can be made to your account. The cancellation of a Premium Service will go into effect at the end of your current billing cycle, and you will have the same level of access to the Premium Service through the remainder of such billing cycle. For example, if you are billed on a monthly basis and cancel during a given month, you will be charged for the entirety of that month and maintain access to the Premium Service through the end of that month.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            There are no refunds for termination or cancellation of your Premium Service. If you no longer wish to subscribe to a Premium Service, it is your responsibility to cancel your Premium Service in due time, regardless of whether or not you actively use the Premium Service.
          </Text>
          {/* -------- 7.3 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>7.3 Fee Changes</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            To the maximum extent permitted by applicable laws, we may change our prices for Premium Services at any time. We will give you reasonable notice of any such pricing changes by posting the new prices on or through the applicable Premium Service and/or by sending you an email notification. If you do not wish to pay the new prices, you can cancel the applicable Premium Service prior to the change going into effect.
          </Text>
          {/* -------- 7.4 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>7.4 Discount, Coupon or Gift Codes</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you have received a discount, coupon or gift code to a Premium Service, the following terms and conditions apply in addition to the terms and conditions of the specific code. To redeem a discount or coupon code, log in to the applicable Service and enter the applicable code to take advantage of the relevant promotion. All discounts, gift and coupon codes can only be applied when subscribing to Premium Services, and to accounts not already subscribed to Premium Services. Discount, coupon and gift codes cannot be combined with any other cash-off price, sales, promotion or coupon, and cannot be exchanged, refunded, replaced or redeemed for cash or payment of accounts. A payment method may be required to redeem a discount or coupon code. It is your own responsibility to use a discount, coupon or gift code before it expires, and expired codes cannot be refunded or extended. It is also your responsibility to terminate the Premium Service before the end of a free or discounted period if you do not want to continue with a Premium Service at the regular price. The terms and conditions of a specific discount, coupon or gift code may include additional restrictions on its use, including but not limited to the type of plan, duration of free or discounted Premium Service, coupon validity dates, and/or purchase quantities. Red Green reserves the right to cancel discounts and coupon promotions at any time.
          </Text>
          {/* -------- 7.5 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>7.5 Free Trials</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We sometimes offer free trials of our Premium Services or other promotional offers (each a “Free Trial”). A Free Trial provides you access to the Premium Services for a period of time, with details specified when you sign up for the offer.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            In order to sign up for a Free Trial, you may need to provide us with your preferred Payment Method. As soon as you submit your payment details, your Free Trial will begin. You will not be charged until the Free Trial period ends.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Unless you cancel before the end of the Free Trial, or unless otherwise stated, your access to the Premium Service will automatically continue and you will be billed the applicable fees for that Premium Service using the Payment Method you provided. All incurred charges are final and non-refundable, except at our sole discretion and in accordance with the rules governing each Premium Service. We may send you a reminder when your Free Trial is about to end, but we do not guarantee any such notifications. It is ultimately your responsibility to know when the Free Trial will end if you decide you do not want to become a paying Premium Services user after the Free Trial period.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you decide you do not want to become a paying Premium Services user, you must cancel your subscription before the end of the Free Trial period. Depending on the applicable Premium Service, you may lose access as soon as you cancel or at the end of the Free Trial period. Once you have cancelled your Free Trial and received confirmation, you cannot resume the Free Trial period even if it was not used for the entire duration of the offer.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Premium Service features and content may change at any time, and we cannot guarantee any specific feature or content will be available for the entire Free Trial period. The rates in effect when you sign up for the Free Trial will be the same when the Free Trial ends, unless we notify you otherwise. We reserve the right, in our absolute discretion, to modify or terminate any Free Trial offer, your access to the Premium Services during the Free Trial, or any of these terms without notice and with no liability. You may not sign up for more than one Free Trial of a given Premium Service at the same time, and we reserve the right to limit your ability to take advantage of multiple Free Trials.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 8.0 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>8. Shopping and E-Commerce</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Red Green does not currently offer shopping or E-Commerce opportunities, but may do so at a later date.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 9.0 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>9. Physical Activities and Dietary Guidance</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            It&apos;s important to us that users stay healthy while achieving their fitness goals. Please be responsible and use your best judgment and common sense. We provide our Services for information purposes only, and can&apos;t be held liable if you get injured or something goes wrong. In particular, while most of the content posted by the other users in our community is helpful, it is coming from strangers on the Internet and should never trump good judgment or actual medical advice. We strongly advise that you consult your physician about your use of Red Green.
          </Text>
          {/* -------- 9.1 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>9.1 Safety First</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Red Green cares about your safety. You should consult with your healthcare provider(s) and consider the associated risks before using our Services in connection with any physical activity, wellness or fitness program, or any dietary program or guidance. By using our Services, you agree, represent and warrant that you have received consent from your physician to participate in wellness and fitness programs, workouts, exercises or any of the related activities made available to you in connection with the Services, and that you have consulted with your physician before making any dietary changes based upon information available through the Services. Everyone’s condition and abilities are different, and participating in the activities promoted by our Services is at your own risk. If you choose to participate in these activities, you do so of your own free will and accord, knowingly and voluntarily assuming all risks associated with such activities. Activities promoted by the Services may pose risks even to those who are currently in good health.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You understand and agree that we will not carry out and are not responsible for any physical inspection, supervision, preparation, execution or conduct of any activities related to or accessed or discovered via the Services (e.g., featured, official or community created challenges; routes; friendly competitions or similar activities; any single or group training activities; any Third-Party Activities or other events or activities that utilize our Services). Maps, directions and other GPS or navigation data, including data relating to your current location, may be unavailable, inaccurate or incomplete. We encourage you to always put safety first, follow applicable traffic regulations, do not change settings on your device while in motion or in unsafe areas and always be vigilant and take stock of your surroundings when exercising.
            You expressly agree that your athletic activities, which may generate the User-Generated Content you post or seek to post on or via the Services (e.g., running, walking, cycling, hiking) and certain Third-Party Activities carry certain inherent and significant risks of property damage, bodily injury, or death and that you voluntarily assume all known and unknown risks associated with these activities, even if caused in whole or part by the action, inaction, or negligence of Red Green or by the action, inaction, or negligence of others.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Except as otherwise set out in these Terms, and to the maximum extent permitted by applicable law, we are not responsible or liable, either directly or indirectly, for any injuries or damages sustained from your physical activities or your use of, or inability to use, any Services or features of the Services, including any Content or activities you access or learn about through our Services (e.g., a Third-Party Activity such as a yoga class), even if caused in whole or part by the action, inaction or negligence of Red Green or others. To the maximum extent permitted by applicable law, you expressly agree we do not assume responsibility for any Third-Party Activity or any other race, contest, class, athletic activity or event that utilizes or is promoted by or accessed via the Services.
          </Text>
          {/* -------- 9.2 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>9.2 Disclaimer Regarding Accuracy and Reliance on Content</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We make no representations or warranties as to the accuracy, reliability, completeness or timeliness of any Content available through the Services, and we make no commitment to update such Content.
            In addition, User-Generated Content, including advice, statements, or other information, including, without limitation, food, nutrition, dietary guidance, exercise or training guidance, athletic activities, and exercise database entries, are not produced by Red Green, and should not be relied on without independent verification. User-Generated Content, whether publicly posted or privately transmitted, is the sole responsibility of the user from whom such User-Generated Content originated. All information is provided “as is” without any representation, warranty or condition as to its accuracy or reliability.
            Not all users who may identify themselves as professional trainers or licensed dieticians are licensed in all applicable jurisdictions. Red Green has no and assumes no obligation to verify that users who identify themselves as licensed trainers or dieticians are actually licensed. If you hold yourself out as a licensed trainer or dietician, you represent and warrant that you are actually licensed for the services you provide in the jurisdiction in which you offer your services. Users should also bear in mind that even if a user is a licensed trainer in one jurisdiction that does not mean the trainer user is licensed in the jurisdiction from which other users access the trainer user’s advice. Accordingly, relying on any advice provided by other users is at your own risk. To the extent permitted by applicable law, under no circumstances will Red Green be responsible or liable for any loss or damage resulting from your reliance on information or advice provided by any user of our Services.
          </Text>
          {/* -------- 9.3 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>9.3 Not Medical Advice</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We aim to provide useful general information for our community, not professional medical advice. The Services are not medical devices, and the data provided by them is not intended to be utilized for medical purposes or to diagnose, treat, cure or prevent any disease, ailment or injury. To the maximum extent permitted by applicable law, you expressly agree we are not providing medical advice via the Services. All Content provided through the Services, whether provided by us or by other users or third parties (even if they are claiming to be a doctor!) is not intended to be and should not be used in place of (a) the advice of your physician or other medical professionals, (b) a visit, call or consultation with your physician or other medical professionals, or © information contained on or in any product packaging or label. To the extent permitted by applicable law, we are not responsible for any health problems that may result from training programs, dietary recommendations, consultations, products, or events you learn about through the Services. Should you have any health-related questions, please call or see your physician or other healthcare provider promptly. If you have an emergency, call your physician or your local emergency services immediately.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Your use of the Services does not constitute or create a doctor-patient, therapist-patient or other healthcare professional relationship between Red Green and you.
          </Text>
          {/* -------- 9.4 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>9.4 Success Stories Not Typical</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Success stories posted by users or Red Green on our Services may not represent typical or even accurate results obtained from any particular fitness activity or diet. To the extent permitted by applicable law, Red Green has no and assumes no obligation or liability associated with the accuracy, reliability or effectiveness of any fitness activity or dietary recommendation contained in any user success stories.
          </Text>
          {/* -------- 9.5 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>9.5 Accuracy</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            The Services are intended to provide you with information to encourage you to support your wellness and fitness activities. Some of the Services are aimed at tracking your physical movements and sleep activity (“Activity Tracking Services”). These Activity Tracking Services rely on sensors and/or GPS functionality that track your movement or body at rest. The data and information provided by the Activity Tracking Services are intended to be a representation of your activity, but may not be completely accurate, including with respect to step, sleep, speed, distance, or calorie data. By using Activity Tracking Services, you acknowledge and agree that Red Green is not responsible or liable for any inaccuracy in such data.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are a resident of New Jersey or the Netherlands:
            {'\n'}
            Notwithstanding anything herein to the contrary, nothing in these Terms limits or excludes our responsibility for losses or damages caused by Red Green’s own fraud, recklessness, gross negligence or willful misconduct.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 10 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>10.1 Updates to these Terms</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            As Red Green grows and improves, we might have to make changes to these Terms or include additional terms that are specific to certain products.
          </Text>
          {/* -------- 10.1 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>10. Modifications to the Terms and Product-Specific Terms</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Red Green reserves the right to modify these Terms by (i) posting revised Terms on and/or through the Services, and/or (ii) providing advance notice to you of material changes to the Terms, generally via email where practicable, and otherwise through the Services (such as through a notification on the home page of the Red Green websites or in our applications). Modifications will not apply retroactively unless required by law..
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We may sometimes ask you to review and to explicitly agree to or reject a revised version of the Terms. In such cases, modifications will be effective at the time of your agreement to the modified version of the Terms. If you do not agree at that time, you are not permitted to use the Services. In cases where we do not ask for your explicit agreement to a modified version of the Terms, the modified version of the Terms will become effective as of the date specified in the Terms. Your choice to maintain an account, access or use the Services (regardless of whether you create an account with us) following that date constitutes your acceptance of the terms and conditions of the Terms as modified. If you do not agree to the modifications, you are not permitted to use, and should discontinue your use of, the Services.
          </Text>
          {/* -------- 10.2 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>10.2 Product-Specific Terms</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We may also require you to agree to additional terms, rules, policies, guidelines, or other conditions (collectively, “Product-Specific Terms” that are specific to certain Services (for example, the Commercial Tools). In such cases, you may be required to expressly consent to Product-Specific Terms. For instance, you might need to check a box or click on a button marked “I agree.” If any of the Product-Specific Terms are different than the Terms, the Product-Specific Terms will supplement, amend, or supersede the Terms, but only with respect to the subject matter of the Product-Specific Terms.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 11 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>11. No Warranties</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            EXCEPT WHERE PROHIBITED BY LAW, RED GREEN EXPRESSLY DISCLAIMS ALL WARRANTIES, REPRESENTATIONS AND GUARANTEES OF ANY KIND, WHETHER ORAL OR WRITTEN, EXPRESS, IMPLIED, STATUTORY OR OTHERWISE, INCLUDING, BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT TO THE FULLEST EXTENT PERMISSIBLE UNDER THE LAW. THE SERVICES AND ALL CONTENT ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” WITH ALL FAULTS BASIS.
            {'\n'}
            Without limiting the foregoing, you understand that, to the maximum extent permitted by applicable law, we make no warranty regarding the quality, accuracy, timeliness, truthfulness, completeness, availability, or reliability of any of the Services or any Content. To the maximum extent permitted by applicable law, we do not warrant that (i) the Services will meet your requirements or provide specific results, (ii) the operation of the Services will be uninterrupted, virus- or error-free or free from other harmful elements or (iii) errors will be corrected. Any oral or written advice provided by our agents or us does not and will not create any warranty. To the maximum extent permitted by applicable law, we also make no representations or warranties of any kind with respect to Content; User-Generated Content, in particular, is provided by and is solely the responsibility of the users providing that Content. No advice or information, whether oral or written, obtained from other users or through the Services, will create any warranty not expressly made herein. You therefore expressly acknowledge and agree that use of the Services is at your sole risk and that the entire risk as to satisfactory quality, performance, accuracy and effort is with you.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 12 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>12. Limitation of Liability</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We are building the best Services we can for you but we can&apos;t promise they will be perfect. We&apos;re not liable for various things that could go wrong as a result of your use of the Services.
            To the maximum extent permitted by applicable law, under no circumstances (including, without limitation, negligence) shall Red Green, its subsidiaries, partners or any wireless carriers be liable to you or any third party for (a) any indirect, incidental, special, reliance, exemplary, punitive, or consequential damages of any kind whatsoever; (b) loss of profits, revenue, data, use, goodwill, or other intangible losses; © damages relating to your access to, use of, or inability to access or use the Services; (d) damages relating to any conduct or content of any third party or user of the Services, including without limitation, defamatory, offensive or illegal conduct or content; and/or (e) damages in any manner relating to any Third-Party Content, Third-party Products or Third-Party Activities accessed via the Services. To the maximum extent permitted by applicable law, this limitation applies to all claims, whether based on warranty, contract, tort, or any other legal theory, whether or not Red Green has been informed of the possibility of such damage, and further where a remedy set forth herein is found to have failed its essential purpose. To the maximum extent permitted by applicable law, the total liability of Red Green, for any claim under these Terms, including for any implied warranties, is limited to the greater of one thousand dollars (us $1,000.00) or the amount you paid us to use the applicable Service(s) in the past twelve months.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            In particular, to the extent permitted by applicable law, we are not liable for any claims arising out of (a) your use of the Services (including but not limited to your participation in any activities promoted by or accessed via the Services), (b) the use, disclosure, display, or maintenance of a user’s Personal Data, © any other interactions with us or any other users of the Services, even if we have been advised of the possibility of such damages, or (d) other Content, information, services or goods received through or advertised on the Services or received through any links provided with the Services.
            To the extent permitted by applicable law, you acknowledge and agree that we offer the Services and set the Services’ prices in reliance upon the warranty disclaimers, releases, and limitations of liability set forth in the Terms, that these warranty disclaimers, releases, and limitations of liability reflect a reasonable and fair allocation of risk between you and form an essential basis of the bargain between you and us. We would not be able to provide the Services to you on an economically reasonable basis without these warranty disclaimers, releases, and limitations of liability.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are a resident of California: You waive your rights with respect to California Civil Code Section 1542, which says “a general release does not extend to claims which the creditor does not know or suspect to exist in his favor at the time of executing the release, which, if known by him must have materially affected his settlement with the debtor.”
            If you are a resident of New Jersey: Notwithstanding anything herein to the contrary, nothing in these Terms limits or excludes our responsibility for losses or damages caused by UA’s own fraud, recklessness, gross negligence or willful misconduct.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 13 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>13. Indemnification</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are a resident of the United States or any location other than France or Germany: To the maximum extent permitted by applicable law, you agree to indemnify and hold Red Green, its subsidiaries, suppliers and other partners harmless from any claim or demand, including reasonable accounting and attorneys’ fees, made by any third party due to or arising out of (a) the User-Generated Content you access or share through the Services; (b) your use of the Services, © your athletic activities in connection with the Services (including, but not limited to, athletic activities in connection with any contests, races, group activities, Third-Party Activities or other events that we may sponsor, organize, participate in, or where the Services are employed), (d) your connection to the Services, (e) your violation of these Terms, (f) your use or misuse of any user’s Personal Data, (g) any violation of the rights of any other person or entity by you, or (h) your employment of the Services to meet another user in person or to locate and attend any offline place or event. We reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us under the Terms, and you agree to cooperate with our defense of these claims.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are a resident of France or Germany: Notwithstanding the previous paragraph, you agree to indemnify and hold Red Green, its subsidiaries, suppliers and other partners harmless from any claim or demand as result of your negligent or intentional behavior, including reasonable accounting and attorneys’ fees, made by any third party due to or arising out of (a) the User-Generated Content you access through the Services; (b) your violation of these Terms, © your use or misuse of any user’s Personal Data, (d) any violation of the rights of any other person or entity by you, or (e) your employment of the Services to meet another user in person or to locate and attend any offline place or event. We reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us under the Terms, and you agree to cooperate with our defense of these claims.
            If you are a resident of New Jersey: Notwithstanding anything herein to the contrary, nothing in these Terms imposes an obligation for you to indemnify us from claims arising out of RG’s own fraud, recklessness, gross negligence or willful misconduct.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 14 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>14. Governing Law</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are a resident of the United States or any non-European Union location: These Terms shall be governed by and construed in accordance with the laws of the State of Maryland and controlling U.S. federal law as applicable, without regard to its conflict of law principles.
            If you are a resident of the European Union: These Terms shall be governed by and construed in accordance with the laws of the Netherlands, without regard to its conflict of law principles.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 15 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>15. Disputes and Arbitration, Jurisdiction and Venue</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            To the maximum extent permitted by applicable law, you and Red Green agree that any dispute resolution proceedings will be conducted only on an individual basis and not in a class, consolidated or representative action. Except where prohibited, you and we agree to submit to the personal and exclusive arbitration of disputes relating to your general use of the Services under the rules of the American Arbitration Association. Please visit
            <Text
              style={{ color: 'blue' }}
              onPress={() => Linking.openURL('https:// adr.org')}
            >
              www.adr.org

            </Text>
            {' '}
            for more information about arbitration.
            Any arbitration between you and us, to the extent necessary, will be conducted in Baltimore, Maryland, and you waive any right to claim that such location is an inconvenient forum. You agree not to sue us or bring arbitration in any other forum.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            The arbitration will be conducted in English. A single independent and impartial arbitrator will be appointed pursuant to the rules of the American Arbitration Association. Both you and we agree to comply with the following rules, which are intended to streamline the dispute resolution process and reduce the costs and burdens for everyone involved:
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            •	the arbitration will be conducted by telephone, online and/or be solely based on written submissions, the specific manner to be chosen by the party initiating the arbitration;
            {'\n'}
            •	the arbitration will not require any personal appearance by the parties or witnesses unless otherwise mutually agreed in writing by the parties; and
            {'\n'}
            •	any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.
            Barring extraordinary circumstances, the arbitrator will issue his or her decision within 120 days from the date the arbitrator is appointed. The arbitrator may extend this time limit for an additional 30 days in the interests of justice. All arbitration proceedings will be closed to the public and confidential and all records relating thereto will be permanently sealed, except as necessary to obtain court confirmation of the arbitration award. The award of the arbitrator will be in writing and will include a statement describing the reasons for the disposition of any claim.
            You also acknowledge and understand that, with respect to any dispute with us arising out of or relating to your choice to maintain an account, access or use the Services:
            {'\n'}
            •	You are giving up your right to have a trial by jury;
            {'\n'}
            •	You are giving up your right to serve as a representative, as a private attorney general, or in any other representative capacity, or to participate as a member of a class of claimants, in any lawsuit involving any such dispute; and
            {'\n'}
            •	You must file any claim within one (1) year after such claim arose or it is forever barred.
            If this arbitration provision is found to be null and void, then all disputes arising under the Terms between us will be subject to the jurisdiction of the state and federal courts located in Baltimore, Maryland, and you and we hereby submit to the personal jurisdiction and venue of these courts.
            This agreement to arbitrate will not preclude you or Red Green from seeking provisional remedies in aid of arbitration, including without limitation orders to stay a court action, compel arbitration or confirm an arbitral award, from a court of competent jurisdiction. Furthermore, this agreement to arbitrate will not preclude you or Red Green from (i) applying to the appropriate court of competent jurisdiction for a temporary restraining order, preliminary injunction, or other interim or conservatory relief, as necessary, or (ii) seeking relief in any state or federal court for disputes related to a violation or possible violation of Red Green’s intellectual property rights.
            In the event of any litigation or arbitration arising from or related to these Terms, or the Services provided, the prevailing party shall be entitled to recover from the non-prevailing party all reasonable costs incurred including staff time, court costs, attorneys’ fees, and all other related expenses incurred in such litigation or arbitration.
            If you are a resident of the European Union: Notwithstanding anything in these Terms to the contrary, if there is a dispute that you and Red Green cannot resolve, you have the right to submit a complaint through http://ec.europa.eu/consumers/odr. Other than as set out in these Terms, we do not participate in any ADR scheme.
            {'\n'}
            •	In addition, nothing in these Terms limits your rights to bring an action against Red Green in the local courts of your place of domicile. All disputes arising under the Terms between you and Red Green will be subject to the non-exclusive jurisdiction of the courts located in your place of domicile, or the courts located in the Netherlands, and you and we hereby submit to the personal jurisdiction and venue of these courts.
            If you are a resident of Finland: Notwithstanding anything in these Terms to the contrary, if there is a dispute that you and Red Green cannot resolve, you have the right to submit a complaint to the local Consumer Disputes Board or other corresponding body.
            If you are a resident of Denmark: Notwithstanding anything in these Terms to the contrary, if there is a dispute that you and Red Green cannot resolve, you have the right to submit a complaint to the Danish Competition and Consumer Authority (Konkurrence- og Forbrugerstyrelsen, Center for Klageløsning, Carl Jacobsens Vej 35, 2500 Valby, mail: cfk@kfst.dk).
            If you are a resident of South Korea: Notwithstanding anything in these Terms to the contrary, nothing in these Terms limits your rights to bring an action against Red Green in the local courts of your place of domicile.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 16 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>16. International Terms</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are not a United States resident and you are accessing our Services from outside the United States, you agree to transfer certain information outside your location to us, and that you will follow all the laws that apply to you.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            We provide our Services for a global community of users. Our servers and operations are, however, located primarily in the United States, and our policies and procedures are based primarily on United States law. Because of this, the following provisions apply specifically to users located outside of the United States: (i) you consent to the transfer, storage, and processing of your information, including but not limited to User-Generated Content and any Personal Data, to and in the United States and/or other countries; (ii) if you are using the Services from a location embargoed by the United States, or are on the United States Treasury Department’s list of “Specially Designated Nationals,” you are not authorized to access or make use of the Services; and (iii) you agree to comply with all local laws, rules, and regulations including, without limitation, all laws, rules, and regulations in effect in the location in which you reside and the location from which you access the Services. The Services are not intended for distribution to, or use by, any person or entity in any jurisdiction or location where such distribution or use would be contrary to law or regulation, or which that would subject Red Green or its affiliates to any registration requirement within such jurisdiction or location.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            The names used for countries or regions in these Terms, the Privacy Policy and any associated features or documentation are based on the United Nations Terminology Database.
            If you are a resident of the European Union, Hong Kong (SAR of China), Russia, New Zealand or South Korea: Notwithstanding anything in these Terms to the contrary, please note that certain jurisdictions may not allow the waiver or limitation of certain warranties, liabilities or damages under mandatory law, so some of the exclusions and limitations in these Terms may not apply to you. Nothing in these Terms limits or excludes our responsibility for (1) fraudulent representations made by us, (2) death or personal injury caused by our negligence or willful misconduct, or (3) non-execution of any material contractual obligation.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are a resident of New Zealand: Notwithstanding anything in these Terms to the contrary, nothing in these Terms limits or excludes our liability or your rights if you are a consumer for the purposes of the Consumer Guarantees Act 1993, or the Fair Trading Act 1986.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are a resident of Germany, France, Austria or Finland: Notwithstanding anything in these Terms to the contrary, the qualifier “to the maximum extent permitted by law” and other qualifiers of similar effect shall be deemed to be deleted from the Terms everywhere it appears and shall have no force and effect.
            If you are a resident of Japan: Notwithstanding anything in these Terms to the contrary, nothing in these Terms limits or excludes our liability or your rights if you are a consumer for the purposes of the Consumer Contract Act.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you are a resident of South Korea: Notwithstanding anything in these Terms to the contrary, any modification to these Terms will be announced on the website prior to the effective date thereof; provided if you do not express intent to refuse such modification or change after a reasonable period of time following such announcement, it is deemed that you have consented to such modification or change.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 17 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>17. Survival</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If our relationship or these Terms terminate, it will not limit any of our other rights or remedies, and any provision of these Terms that must survive in order to give proper effect to the intent and purpose of these Terms will survive termination, including without limitation Sections 2 (Ownership and Use of Content), 9 (Physical Activities and Dietary Guidance), 11 (No Warranties), 12 (Limitations of Liability), 13 (Indemnification), 15 (Disputes and Arbitration, Jurisdiction and Venue), and 17 (Survival).
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 18  --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>18. Miscellaneous</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            You agree that no joint venture, partnership, employment, or agency relationship exists between you and us as a result of the Terms or your use of the Services. The Terms and any Product-Specific Terms constitute the entire agreement between you and us with respect to your use of the Services.
            Our failure to exercise or enforce any right or provision of the Terms does not constitute a waiver of such right or provision. If any provision of the Terms is found by a court of competent jurisdiction to be invalid, the parties nevertheless agree that the court should endeavor to give effect to the parties’ intentions as reflected in the provision, and the other provisions of the Terms remain in full force and effect.
            You may not assign, delegate, or otherwise transfer your account or your obligations under these Terms without our prior written consent. We have the right, in our sole discretion, to transfer or assign all or any part of our rights under these Terms and will have the right to delegate or use third-party contractors to fulfill our duties and obligations under these Terms and in connection with the Services.
          </Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            Our notice to you via email, regular mail, or notices or links displayed in connection with the Services constitutes acceptable notice to you under the Terms. We are not responsible for your failure to receive notice if email is quarantined by your email security system (e.g., “junk” or “spam” folder) or if you fail to update your email address. Notice will be considered received forty-eight hours after it is sent if transmitted via email or regular mail. In the event that notice is provided via links displayed in connection with the Services, then it will be considered received twenty-four hours after it is first displayed.
          </Text>
        </View>
        <View style={tailwind('my-3')}>
          {/* -------- 19 --------- */}
          <Text style={[tailwind('text-base font-medium text-text my-3'), styles.sectionTitleTextSmall]}>19. Contact Us</Text>
          <Text style={[tailwind('text-text leading-5'), styles.text, styles.lightParagraph, styles.paragraph]}>
            If you have any feedback, questions or comments about the Services, please contact our Support Team by email, by phone at 1-780-621-3358, or by mail at: Red Green, PO BOX 7138, Drayton Valley, AB T7A 1S4 (Canada), and include the subject as “Attn: Legal - Terms and Conditions of Use”. Please be sure to include in any email or postal mail your full name, email address, postal address, and any message.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>

  );
}

export default ReadTerms;
