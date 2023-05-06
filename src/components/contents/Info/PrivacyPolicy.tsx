import React from 'react'
import Footer from '../Footer/Footer'

const PrivacyPolicy = () => {
  return (
    <div className='mx-5 text-sm mx:text-xl'>
      <h1 className='my-5 md:hidden'>プライバシーポリシー</h1>
      <br />
      <p>当サービス運営者(以下、「運営者」とする。)は、本ウェブアプリ上で提供するサービス(以下、「以下、「本サービス」とする。」とする。)におけるユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー(以下、「本ポリシー」とする。)を定めます。</p>
      <br />
      <div >
        <h1 className='font-bold text-sm my-2 md:text-2xl'>1. 個人情報の取得方法</h1> 
        <p>運営者はユーザーが利用登録をするとき、性別・生年月日・メールアドレスなど個人情報をお尋ねすることがあります。</p>
        <p>有料サービスに登録するとき、銀行口座番号・クレジットカード番号などをお尋ねすることがあります。</p>
      </div>
      <br />
      <div>
        <h1 className='font-bold text-sm my-2 md:text-2xl'>2. 個人情報の利用目的</h1> 
        <ul className='mx-2 list-disc list-inside'>
          <li>本サービスの提供・運営のため</li>
          <li> 質問、投票の分析のため</li>
          <li>利用規約に違反したユーザーや，不正・不当な目的でサービスを利用しようとするユーザーの特定をし，ご利用をお断りするため</li>
          <li>メンテナンス，重要なお知らせなど必要に応じたご連絡のため</li>
          <li>有料サービスにおいて，ユーザーに利用料金を請求するため</li>
          <li>法令等により提供が必要な場合に、適切な第三者への情報開示責任を遂行するため</li>
          <li>その他、上記の利用目的に付随する目的</li>
        </ul> 
      </div>
      <br />
      <div>
        <h1 className='font-bold text-sm my-2 md:text-2xl' >3. 個人情報の第三者提供</h1>
        運営者は，次に掲げる場合を除いて，あらかじめユーザーの同意を得ることなく，第三者に個人情報を提供することはありません。ただし，個人情報保護法その他の法令で認められる場合を除きます
      
        <div className='mx-2'>
          <h1 className='font-bold my-5'>(1). 性別・生年月日に関して</h1>
          <ul className='list-disc list-inside'>
              <li>質問の投稿者が質問・投票の分析をするために、性別・生年月日の情報が提供される場合がございます。</li>
              <li>質問の投稿者の質問に投票を行った際にのみ、投票者の性別・生年月日の情報が提供されます。</li>
          </ul>

          <h1 className='font-bold my-5'>(2). その他の個人情報について</h1>
          <ul className='list-disc list-inside'>
            <li>人の生命，身体または財産の保護のために必要がある場合であって，本人の同意を得ることが困難である場合</li>
            <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって，本人の同意を得ることが困難である場合</li>
            <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって，本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがある場合</li>
            <li>法律に基づく場合</li>
            
          </ul>
        </div>
      </div>
      <br />
      <div>
        <h1 className='font-bold text-sm my-2 md:text-2xl'> 4. Cookieの利用</h1>
        <p className='mx-3'> Cookie は、ウェブサーバーがウェブブラウザーに情報を記憶させる機能です。当サイトでは Cookie を利用することがあります。</p>
      </div>
     
      <div>
        <h1 className='font-bold text-sm my-2 md:text-2xl'> 5. 本プライバシーポリシーの改定</h1>
        <ul className='mx-2 list-disc list-inside'>
          <li>本ポリシーの内容は，法令その他本ポリシーに別段の定めのある事項を除いて，ユーザーに通知することなく，変更することができるものとします。</li>
          <li>運営者が別途定める場合を除いて，変更後のプライバシーポリシーは，本ウェブサイトに掲載したときから効力を生じるものとします。</li>
        </ul>
      </div>
      <br />
      <div>
        <h1 className='font-bold text-sm my-2 md:text-2xl'> 6. お問い合せ</h1>
        本ポリシーに関するお問い合わせは，下記のメールアドレスまでお願いいたします。
        <p> Eメールアドレス: voteselection2023@gmail.com</p>
      </div>
      <br />
      <br />
     <Footer/>
    </div>
  )
}

export default PrivacyPolicy