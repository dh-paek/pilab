---
title: "K-Radar: a large-scale 4D radar dataset for driving in adverse weather"
headline:
  ko: "악천후 자율주행을 위한 대규모 4D 레이더 데이터셋 K-Radar 구축"
  en: "K-Radar: a large-scale 4D radar dataset for driving in adverse weather"
summary:
  ko: "폭설·폭우·안개 속 주행을 담은 대규모 4D 레이더 데이터셋과 벤치마크 K-Radar를 구축했습니다."
  en: "We built K-Radar, a large-scale 4D radar dataset and benchmark recorded in heavy snow, rain, and fog."
category: paper
image: /assets/img/news/2022-04-06-k-radar-dataset/01.png
image_alt: "눈 오는 날, 4D 레이더·카메라·RTK-GPS를 장착한 K-Radar 수집 차량"
gallery:
  - { src: /assets/img/news/2022-04-06-k-radar-dataset/02.png, alt: "전방 카메라·블랙박스·LiDAR·4D 레이더 측정 비교" }
---
백동희 교수가 KAIST AVE Lab 박사과정 시절 제1저자로 주도한 **K-Radar**는 폭설·폭우·안개 같은 악천후에서의 자율주행을 위한 대규모 4D 레이더 데이터셋이자 벤치마크입니다.

- 22,000개 이상의 4D 레이더 데이터에 주요 도로 객체의 3D 박스와 속도 라벨 제공
- 시간당 4cm 이상의 폭설 등 극한 기상에서 고속도로·국도·도심 도로 주행 데이터 수집
- 카메라, LiDAR, RTK-GPS, IMU 데이터를 정밀하게 동기화해 함께 제공
- 4D 레이더 국내 기업 ㈜스마트레이더시스템과 협력

눈길 고속도로를 5분가량 달리자 카메라와 LiDAR는 센서 표면이 눈으로 덮여 전방을 보지 못했지만, 4D 레이더는 앞 차량을 계속 검출했습니다. K-Radar는 4D 레이더 기반 객체 검출·추적·SLAM과 센서 융합 연구의 기반 데이터로 공개되었습니다.

원문: KAIST AVE Lab 소식 (2022.04.06)

<!--en-->

**K-Radar**, led by Prof. Dong-Hee Paek as first author during his Ph.D. at KAIST AVE Lab, is a large-scale 4D radar dataset and benchmark for autonomous driving in adverse weather such as heavy snow, rain, and fog.

- More than 22,000 4D radar frames with 3D box and velocity labels for key road objects
- Recorded on highways, national roads, and urban roads, including snowfall above 4 cm per hour
- Precisely synchronized camera, LiDAR, RTK-GPS, and IMU data
- Built in collaboration with Smart Radar System, a Korean 4D radar company

After about five minutes of highway driving in snow, the camera and LiDAR were covered and lost the road ahead, while the 4D radar kept detecting the leading vehicle. K-Radar was released as a foundation for 4D radar detection, tracking, SLAM, and sensor fusion research.

Original post: KAIST AVE Lab News (Apr 6, 2022)
