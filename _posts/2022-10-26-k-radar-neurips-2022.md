---
title: "K-Radar accepted at NeurIPS 2022 Datasets and Benchmarks Track"
headline:
  ko: "4D 레이더 AI 연구 K-Radar, NeurIPS 2022 게재"
  en: "K-Radar accepted at NeurIPS 2022"
summary:
  ko: "4D 레이더 텐서 데이터셋 K-Radar와 검출 네트워크가 NeurIPS 2022 Datasets and Benchmarks Track에 게재되었습니다."
  en: "The K-Radar 4D radar tensor dataset and detection network were accepted at the NeurIPS 2022 Datasets and Benchmarks Track."
category: paper
image: /assets/img/news/2022-10-26-k-radar-neurips-2022/01.jpg
image_alt: "다양한 기상 조건의 K-Radar 데이터 샘플 (논문 그림)"
gallery:
  - { src: /assets/img/news/2022-10-26-k-radar-neurips-2022/02.jpg, alt: "K-Radar 구축용 자율주행 센서 수트 (논문 그림)" }
  - { src: /assets/img/news/2022-10-26-k-radar-neurips-2022/03.jpg, alt: "날씨별 4D 레이더와 LiDAR 인식 결과 비교 (논문 그림)" }
---
논문 **"K-Radar: 4D Radar Object Detection for Autonomous Driving in Various Weather Conditions"**가 세계 최고 수준의 AI 학회 NeurIPS 2022의 Datasets and Benchmarks Track에 게재되었습니다. 백동희 교수(당시 KAIST AVE Lab 박사과정)가 2022년 12월 학회에서 발표했습니다.

- 다양한 날씨와 교통 상황을 담은 약 13TB 규모의 4D 레이더 데이터셋을 카메라·LiDAR와 동기화해 공개
- 잡음 제거 과정에서 약한 신호가 사라지는 포인트 클라우드 대신, 원 신호를 보존하는 **4D 레이더 텐서** 형태로 제공
- 제안한 신경망은 날씨·도로 조건 전반에서 70m 이내 객체의 분류·위치·방향을 62.5% 정확도로 추정했고, 눈·비 속에서는 LiDAR 기반 네트워크보다 안정적인 성능을 보였습니다.

데이터셋, 네트워크, 개발 플랫폼과 벤치마크는 [GitHub](https://github.com/kaist-avelab/k-radar)에 공개되어 있으며, YTN 사이언스·AI 타임스 등 여러 언론에 소개되었습니다. ([arXiv](https://arxiv.org/abs/2206.08171))

원문: KAIST AVE Lab 소식 (2022.10.26)

<!--en-->

The paper **"K-Radar: 4D Radar Object Detection for Autonomous Driving in Various Weather Conditions"** was accepted at the Datasets and Benchmarks Track of NeurIPS 2022. Prof. Dong-Hee Paek, then a Ph.D. student at KAIST AVE Lab, presented it at the conference in December 2022.

- About 13 TB of 4D radar data across diverse weather and traffic, synchronized with camera and LiDAR
- Released as **4D radar tensors** rather than point clouds, preserving weak signals that denoising would remove
- The proposed network estimated class, position, and heading of objects within 70 m with 62.5% accuracy across conditions, and stayed more stable than a LiDAR-based network in snow and rain

The dataset, network, development platform, and benchmark are available on [GitHub](https://github.com/kaist-avelab/k-radar), and the work was covered by YTN Science, AI Times, and other outlets. ([arXiv](https://arxiv.org/abs/2206.08171))

Original post: KAIST AVE Lab News (Oct 26, 2022)
