# Performance Profiling Report

## Overview
This document contains performance analysis results for the Climate Data Table application using React Dev Tools Profiler.

## Profiling Methodology
Profiling was conducted using React Dev Tools Profiler with the following settings:
- ✅ "Record why each component rendered while profiling" - Enabled
- ✅ "Hide commits below 0.1ms" - Enabled
- 🔄 Multiple iterations per test case for accurate results

# Test Scenarios

## 1. Column Sorting Interaction
**User Action**: Sort data by population

## Before
#### Flame Graph
<img width="700" alt="image" src="https://github.com/user-attachments/assets/bd2f33df-37ba-48af-9b03-79bed0e006bd" />

#### Ranked Chart
<img width="700" alt="image" src="https://github.com/user-attachments/assets/153d9fdd-ee0b-49f3-a5c3-03eff86af412" />

## After
#### Flame Graph

#### Ranked Chart

---

## 2. Country Search Operation
**User Action**: Type "United" in search field

## Before
#### Flame Graph
<img width="700" alt="image" src="https://github.com/user-attachments/assets/5537e7ed-0122-4c5a-aaa5-fc516bb12004" />

#### Ranked Chart
<img width="700" alt="image" src="https://github.com/user-attachments/assets/02ff3743-6ded-4af0-80e1-a753b9f30739" />

## After
#### Flame Graph

#### Ranked Chart

---

## 3. Year Selection Change
**User Action**: Select different year from dropdown

## Before
#### Flame Graph
<img width="700" alt="image" src="https://github.com/user-attachments/assets/6a740800-ea1f-4e76-b439-f26508462a38" />

#### Ranked Chart
<img width="700" alt="image" src="https://github.com/user-attachments/assets/1f546de3-5e90-41a4-9684-2bc70cbb5b69" />

## After
#### Flame Graph

#### Ranked Chart

---

## 4. Column Management
**User Action**: Open modal and toggle additional columns

## Before
#### Flame Graph
<img width="700" alt="image" src="https://github.com/user-attachments/assets/eab72dbf-c677-46aa-870e-5beb01d8dd63" />

#### Ranked Chart
<img width="700" alt="image" src="https://github.com/user-attachments/assets/b2bb11bd-4172-4286-9d78-25ab1b80fd5b" />

## After
#### Flame Graph

#### Ranked Chart


---