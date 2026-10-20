---
title: "One ICPC year of HCMUS-AtCoder (DeMen side)"
description: "Hi mọi người, mình là Triệu, hay mọi người thường biết đến mình là Demen. Mình cũng muốn chia sẻ một chút về một năm ICPC của mình với team HCMUS AtCoder. Tính tới thời điểm thành..."
pubDate: "2026-04-03"
categories: ["ICPC"]
tags: ["ICPC", "HCMUS", "AtCoder", "Demen"]
cover: "/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-001.jpg"
excerpt: "Hi mọi người, mình là Triệu, hay mọi người thường biết đến mình là Demen. Mình cũng muốn chia sẻ một chút về một năm ICPC của mình với team HCMUS AtCoder. Tính tới thời điểm thành..."
---
Hi mọi người, mình là Triệu, hay mọi người thường biết đến mình là Demen. Mình cũng muốn chia sẻ một chút về một năm ICPC của mình với team HCMUS-AtCoder. Tính tới thời điểm thành lập AtCoder, mình đã "chơi" CP được 4 năm rồi, cũng quen biết được rất nhiều ae khủng và có một chút thành tích. Tuy nhiên, mình luôn cảm thấy chưa thỏa mãn, cảm giác vẫn còn thiếu chút gì đó. 

Có lẽ HCMUS-AtCoder là điểm kết đẹp cho hành trình CP của mình. Lần đầu mình có huy chương Vàng là với AtCoder, lần đầu đi ICPC World Final cũng là với AtCoder. Lần đầu mình có cảm giác như trong một team thật sự, một tập thể thống nhất, cùng đi chơi, ăn ngủ, training với nhau. Những khoảnh khắc ấy thật sự rất vui và mình sẽ không bao giờ quên được, kể cả về sau này. 

Cảm ơn Lamu, Ann và AtCoder.

## Notation

- Demen: Võ Khắc Triệu
- Ann: Lê Nguyễn Hữu An
- Lamu: Vũ Quốc Lâm

## ICPC Regional Hanoi 2024

### Background

Sau kỳ thi ICPC Jakarta tương đối thành công, team bước vào ICPC Hanoi với tấm thế thoải mái khi gần như nắm chắc vé vào APAC. Nên mục tiêu của AtCoder ở round này là **vô địch**.

Các chi tiết (strategy/skill) của AtCoder giữa round Hanoi và round Jakarta không có nhiều sự thay đổi.

Để đạt được mục tiêu, tụi mình đã thử list ra các team có thể cạnh tranh chức vô địch và có **4 team** như vậy (3 team NUS và fruit_advantage (NTaiwanU)). 

### Day 1 (10/12/2024)

Ngày tới. Cũng không có gì đặc sắc lắm, trừ việc gặp một số người quen cũng tham gia thi ICPC/Olp. Áo ICPC Regional Hanoi năm nay chất vải ổn hơn nhiều so với áo ICPC Regional Hue năm ngoái (cực mỏng).

Team có pose để chụp hình nhưng mà hình không được dùng.

### Day 2 (11/12/2024)

Buổi sáng khai mạc Olympic Tin học Sinh viên và trao giải ICPC National. 

> Note: Khai mạc, diễn ra rất lâu, rất mất thời gian. Một trong những điều cá nhân mình (demen) ghét nhất trong mọi kỳ thi tại VN nói chung và ICPC VN nói riêng.

Buổi chiều diễn ra **Olympic Tin học Sinh viên**. Demen và Lamu có tham gia kỳ thi này. Có vẻ như cả hai cũng không chuẩn bị mấy cho kỳ thi, nhưng mà Demen có lợi thế ở bài Heuristic nên làm tốt hơn (cúp Bạc).

### Day 3 (12/12/2024)

Sáng sớm, tụi mình dậy sớm và cùng các team HCMUS đi **Bảo tàng Lịch sử Quân sự Việt Nam**. Thú thật là mình rất ngạc nhiên với độ lớn và chi tiết của bảo tàng này, quả thật là một trải nghiệm đáng giá. 

Tầm trưa, tụi mình bắt xe về địa điểm thi để dự khai mạc ICPC Regional Hanoi và thử máy.

Trước khi ngủ, tụi mình brief nhanh những gì cần làm cho ngày thi.

### Day 4 (13/12/2024) - Ngày thi

Thời tiết hôm thi khá lạnh, điển hình thời tiết Hà Nội vào mùa đông, cũng là điềm báo rằng kỳ thi sẽ vất vả.

### Diễn biến kỳ thi

#### Các bài AC
- Demen: B, C, D
- Pannda: F, G, J, K, M
- Lamu: H, L

#### 2 tiếng đầu (Phase 1)

- Team AC **C, F, G, L, D** rất nhanh trong một tiếng đầu tiên.
- Sau đó, Ann ac **M** ở phút thứ 97.

Như vậy AtCoder đã AC 6 bài dễ nhất trong 2 tiếng đầu tiên. 

#### 2 tiếng tiếp theo (Phase 2)

Trong vòng 60' sau AC bài M thì team bắt đầu ngồi scout các bài trung bình - khó để làm nên chưa AC được bài nào cả.

Lúc này Ann ra K và Demen ra B rồi. Demen ra trước nên code trước, cơ mà code bug (3 đấm), nên phải ra ngoài cho Ann code. Sau khi Ann AC K (160') thì Demen vô sửa code và AC (186').

Lúc này, team lại quay lại scout bài khi các bài còn lại đều tương đối khó. Sau đó khoảng 30' (~210') thì Lamu ra H và bắt đầu code, tuy nhiên idea Lamu sai (phát hiện do stress code) nên ra ngoài ngồi debug.

Trong lúc đó, Demen và Ann nghĩ thử J. Bài J khá khó nên chưa ai ra ý tưởng gì cả.

#### 1 tiếng cuối cùng (Phase 3 / Freezing Phase)

Sau khi Lamu ra lại idea thì vào vừa code vừa stress. Chỉnh mấy lần như vậy tự nhiên nó AC luôn :D. Lamu giờ qua phụ J.

Lúc này Demen tách ra nghĩ I, nên chỉ có Ann và Lamu làm J. (Không) bất ngờ, Ann nghĩ ra idea J (small-to-large) và bắt đầu code J.

Team đối diện với cuộc chạy đua lên 11 bài để đạt mục tiêu. 2 đấm đầu tiên của Ann ở ~280' TLE do O(nlog^2n) không đủ nhanh. Mọi người lúc này khá hoảng vì tự nhiên thuật TLE nên không biết sửa kiểu gì. Xong Lamu suggest tối ưu lại chỗ gộp set, giảm từ O(klogk) xuống O(k) nên giảm tổng độ phức tạp xuống O(nlogn). Team AC J lúc 296', 4 phút trước khi hết giờ.

Cuối giờ có hai việc xảy ra:
- Khoảng 15' trong đoạn nghĩ thuật optimize J thì Demen lên máy thử tìm quy luật I. Demen nghĩ ra bài này vài chục phút sau khi hết giờ.
- 5' cuối Ann với Lamu thử code E. Thật ra bài E đã được làm từ đầu giờ nhưng lúc đó idea sai nên bỏ, và cuối giờ được ngồi nghĩ lại. Tất nhiên là không thành công.

#### Kết quả



Team AC 10 bài, top 5 chung cuộc, top 1 VN (expected). Sự thật cho thấy, 4 team tụi mình dự đoán có khả năng cạnh tranh vô địch là 4 team trên rank team mình.

Tụi mình cho rằng kết quả này là chấp nhận được, nhưng vẫn có những chỗ có thể cải thiện hơn trong các kỳ thi sắp tới. Riêng mình đã có một kỳ thi tệ khi cài bug nhiều, dẫn tới mất computer time của team.

Ngoài ra, không may mắn thay, các team HCMUS khác đã có kết quả không tốt ở Regional nên đều đã không thể đậu APAC. Do đó HCMUS-AtCoder là đại diện duy nhất của HCMUS cho APAC 2025.

### Day 5 (14/12/2025) - Bay về

Có một sự kiện quan trọng xảy ra khi tụi mình ngồi trên máy bay. Vì chỉ còn mỗi team mình thi APAC cho HCMUS, nên tụi mình quyết định đặt vấn đề cho mục tiêu ở ICPC World Final luôn. Sau khi ngồi stalk và thảo luận một hồi, tụi mình quyết định đặt mục tiêu là:  **Medalist ICPC World Final.**

Dù tụi mình cũng thấy là mục tiêu này hơi căng, nhưng mà vẫn có thể đạt được nếu train đủ nhiều và một chút may mắn. 

## Chuẩn bị cho APAC

Trong giai đoạn chuẩn bị này, tụi mình bắt đầu train những đề ở level APAC/WF (chủ yếu là đề UCup). Tụi mình có nhận ra là strategy tụi mình đang bị overwhelm nhưng mà vẫn chưa có cập nhật gì.

Trong lúc chuẩn bị, tụi mình thấy [OCPC Winter Camp 2025](https://ocpc.camp/2025w/) đã mở. 

> OCPC là ICPC Training Camp tổ chức tại University of Osijek, được host bởi [adamant](https://codeforces.com/profile/adamant). Camp gồm một chuỗi 7 contest tổ chức trong 9 ngày, các contest có độ khó ngang ICPC World Final.

Vì camp năm nay có tổ chức mirror (4/7 contest) ở Singapore, ngay trước APAC Singapore 2025, nên tụi mình quyết định tham gia, để khởi động trước khi thi. Ban đầu tụi mình dự định tự trả tiền hết, tuy nhiên, đã được thầy Hùng fund tiền khách sạn, nên chỉ phải lo chi phí ăn uống và di chuyển.

## OCPC Camp & ICPC Asia-Pacific Championship 2025 (Singapore)

### Đi chơi (21/2/2025 - 2/3/2025)

Chuyến đi lần này ngoài việc tham dự ICPC APAC và OCPC Camp, thì tụi mình cũng đi tham quan khắp Singapore. Cá nhân mình nghĩ lần đi này là lần đi vui nhất trong các chuyến đi của tụi mình ở season này.

Chắc tụi mình đi chơi hết mấy chỗ tourist attraction ở Singapore rồi :))))

<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-001.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-002.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-003.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-004.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-005.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-006.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-007.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-008.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-009.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-010.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-011.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-012.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-013.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-014.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-015.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-016.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-017.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-018.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-019.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-020.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-021.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-022.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-023.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-024.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-025.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-026.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-027.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-028.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-029.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-030.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-031.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-032.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-033.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-034.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-035.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-036.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-037.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-038.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-039.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-040.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-041.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-042.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-043.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-044.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-045.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-046.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-047.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-048.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-049.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-050.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-051.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-052.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-053.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-054.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-055.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-056.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-057.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-058.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-059.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-060.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-061.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-062.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-063.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-064.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-065.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-066.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-067.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-068.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-069.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-070.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-071.jpg" width="100%" loading="lazy" decoding="async">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/archive-2/atcoder-journey-p2-072.jpg" width="100%" loading="lazy" decoding="async">
</div>


### Comment chung về OCPC Camp (22/2/2025 - 26/2/2025, Singapore)

Đề OCPC được thiết kế rất hay, với mỗi contest là do một team khác nhau ra đề. Tụi mình đánh giá cao chất lượng của đề thi.

Có điều, tụi mình perform khá tệ, y chang mấy contest virtual gần đây, có lẽ là do kiệt sức vì phải di chuyển hơn 2 tiếng mỗi ngày (metro), và có lẽ là do strategy đang không tốt.

Dù sao thì, việc phong độ không tốt là điềm báo cho một kỳ thi không tốt.

### Day 1 (27/2/2025)

Tụi mình di chuyển qua khách sạn gần NUS với mấy thầy, có cái giường đôi trông ngộ ngộ :))

Sau đó tụi mình lên NUS chụp hình và đi farm merch và mình cũng chạy đi mua NUS merch:

<div style="display: grid; ; gap: 10px;">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/apac-2025/nus-merch.jpg" width="100%" loading="lazy" decoding="async">
</div>

Tối hôm đó tụi mình được hội tin học Việt Nam mời đi ăn ở nhà hàng Marché.

### Day 2 (28/2/2025)

Lễ khai mạc diễn ra ngắn gọn với màn trình diễn múa lân, và giới thiệu các team ^^, và sau đó là buổi thi thử.

<div style="display: grid; ; gap: 10px;">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/apac-2025/opening-lion-dance.jpg" width="100%" loading="lazy" decoding="async">
</div>

Buổi tối, tụi mình được mời đi ăn tối cùng Jane Street.


### Day 3 (1/3/2025)

Ngày thi chính thức. Tụi mình tới địa điểm thi rất sớm. Dự kiến kỳ thi hôm nay sẽ căng thẳng đấy....

#### Phase 1 (2 tiếng đầu)

Tụi mình AC 5 bài trong tiếng đầu, lần lượt:
- DeMen: A
- Kriz_Wu: D, J, L
- Ann: G

Đây là 5 bài dễ nhất đề, nên tụi mình không quá nhiều trở ngại. Kết thúc phase 1, tụi mình đang ở rank 8, tương đối ổn và an toàn cho suất đi World Final.

#### Phase 2 (2 tiếng sau)

Các bài còn lại khá khó chịu nên team phải scout bài rất lâu để có hướng suy nghĩ. Sau 30', Demen nghĩ bài H, còn Ann và Lamu chuyển sang làm K. 

Và đây là cách Ann với Lamu nghĩ K:

<div style="display: grid; ; gap: 10px;">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/apac-2025/problem-k-discussion.png" width="100%" loading="lazy" decoding="async">
</div>

Trong lúc Ann code K, Lamu chuyển sang nghĩ I.

Mất khá lâu (~40') để Ann AC K (227'), sau đó Lamu code I, trong khi DeMen push H vào queue.

Lamu code I trong khoảng 30' và phát hiện ra thuật sai, nên pop I ra khỏi queue.

Kết thúc phase 2, team có 6 bài, và theo tính toán là 99\% đậu World Final rồi :>

#### Phase 3 (1 tiếng cuối)

Demen vào code H, và..... **BUG**. Chuyện là, demen đã miscalculation trong lúc làm H. Bài H yêu cầu dùng nhiều nhất 10 queries, và code demen dùng ... 11 queries! 

Do panik, demen không nghĩ ra cách tối ưu nào cả, lúc này còn 30', Ann với Lamu quyết định vào cứu. Tuy nhiên, do còn quá ít thời gian, cộng với sự hoảng loạn, rốt cuộc code sau khi fix vẫn là 11 queries hoặc là thuật sai...

Cuối cùng team vẫn làm được 6 bài, vẫn đậu WF, nhưng mà chỉ được Bronze Medal APAC.

<div style="display: grid; ; gap: 10px;">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/results/apac-2025-rankboard.png" width="100%" loading="lazy" decoding="async">
</div>

#### N-Dimensional Sum

Sau lễ trao giải, Lamu bắt chuyện với team BINUS U về solution các bài. Đây là lần nói chuyện đầu tiên giữa AtCoder và N-Dimensional Sum, khởi đầu cho tình bạn đẹp của 2 team :>

#### Conclusion

Mình, người viết bài, cảm thấy đây là kỳ thi chính thức mình làm tệ nhất trong season này, với 4.5 tiếng gần như không đóng góp gì cho team. Hên là Ann (và Lamu) clutch được bài khó hơn (bài K) nên team mới đậu WF được. 

Tụi mình đều nhận ra đây là phong độ tệ nhất của AtCoder kể từ ICPC vòng trường. Sẽ có gì đó phải thay đổi trong 6 tháng tới ICPC WF.


### Day 4 (2/3/2025)

BTC cho tụi mình voucher đi chơi miễn phí ở Universal Studio Singapore. Thầy Triết đã chỉ tụi mình cách đi chơi trong USS. 

**Tối hôm đó, tụi mình phải ngồi xem lại chuyện gì đã xảy ra ở APAC. Một buổi tối dài hơi...**

<div style="display: grid; ; gap: 10px;">
  <img src="/assets/posts/2026-04-03-atcoder-journey-p2/finale/to-be-continued.png" width="100%" loading="lazy" decoding="async">
</div>
