---
title: 점프를 어떻게 구현할까? state machine
created: 2024-03-19 10:45
last-updated: 2024-03-19 10:45
tags:
  - gameDev
  - godot
  - toyproject
description: state machine  디자인 패턴으로 플레이어 상태를 표현하자
---


## 👯‍♂️ 문제; 왜 점프 스프라이트가 적용 안되지?



사실 엄청 간단할 것 같다

`위의 방향키를 누르면 점프한다` 정도인데? 그런데 아무리 점프를 눌러도 점프 스프라이트가 안보인다


![](https://i.imgur.com/vVKmmVC.gif)

GDscript는 아래와 같다

- 만약에 공중이라면
	- 캐릭터가 떨어지는 효과를 구현한다 `velocity.y += gravicy * delta`
- 만약 엔터를  누르고 캐릭터가 바닥에 있다면
	- 점프 스프라이트를 실행한다 `anim.play(Jump)`

```python
extends CharacterBody2D


const SPEED = 30
const JUMP_VELOCITY = -400.0
@onready var anim = get_node("AnimationPlayer")
# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")
	

func _physics_process(delta):
	velocity.x = SPEED
	anim.play("Idle")

	if not is_on_floor(): # 공중이라
		velocity.y += gravity * delta
#
	## Handle jump.
	if Input.is_action_just_pressed("enter") and is_on_floor():		
		velocity.y = JUMP_VELOCITY	
		velocity.y = move_toward(velocity.y, SPEED, SPEED)
		anim.play("Jump") #### 이때는 아예 Jump애니메이션이 실행이 안된다 왜지?

			
			
	
	
	move_and_slide()

```

그런데 아무리 엔터를 눌러도 아래 스프라이트 처럼 공중에 뛰는게 구현이 안된다  
![점프 스프라이트](https://i.imgur.com/9HqdlCE.png)

부분은 캐릭터의 수직 속도가 0보다 작을 때, 즉 캐릭터가 상승 중일 때 점프 애니메이션을 실행합니다
### velocity.y < 0 조건을 추가 한다면?


```ad-important
title: 근데  velocity.y <0의 의미가 뭘까?

- `velocity.y < 0`인 상황은 캐릭터가 화면의 위쪽으로 상승하고 있는 상태를 의미
- velocity.y < 0 이라는 것은 y축 방향으로의 속도가 음수라는 뜻입니다. 즉, y축 방향으로 아래로 움직이고 있다는 것을 나타냅니다. 예를 들어, 중력의 영향을 받는 물체가 자유낙하하고 있다면, 그 물체의 velocity.y 값은 음수가 될 것입니다. 반대로, y축 방향으로 위로 움직이고 있다면, velocity.y 값은 양수가 될 것입니다.

- velocity.y < 0 은 물리학에서 자주 사용되는 개념입니다. 예를 들어, 유니티에서는 rigidbody.velocity.y 를 사용해서 물체의 y축 방향 속도를 알 수 있습니다. 이 값을 이용해서 물체의 상태나 행동을 제어할 수 있습니다. 예를 들어, 물체가 바닥에 닿았는지 여부를 판단하거나, 점프를 할 수 있는지 여부를 결정하거나, 공중에 떠있는 동안의 애니메이션을 재생하거나 할 수 있습니다

```

velocity.y < 0 그러니까 캐릭터가 점프를 하면 그떄 점프스프라이트를 실행하자!  
라고 해봤지만
```python
	## Handle jump.
	if velocity.y <0:
			anim.play("Jump") ####
```

점프 스프라이트 중 첫 번째 프레임만 실행된다  
![](https://i.imgur.com/amX8gww.gif)


## 👯‍♂️ 원인; 초당 60회 호출되는 physics_process()

- 게임루프; 끊임없이 반복되는 과정으로 이 과정에서 게임의 각 프레임(화면에 나타나는 이미지)이 처리된다
- 게임엔진에서는 이렇게 지속적으로 반복되는 게임루프를 실행한다
- 각 프레임마다 무슨일을 처리하냐면?
	- 상태 업데이트 : 게임내 캐릭터/물체/환경 최신 상태 업데이트. 예를 들면 플레이어가 이동버튼 누르면 캐릭터 위치를 게임내에서 변경하는 것이 해당됨
	- 화면 그리기(렌더링) : 업데이트 된 최신상태로 화면에 나타낸다
-  Godot엔진에서는 이러한 게임루프를 실행시키기 위해  `process()`와 `_physics_process()` 메서드를 제공하는데  GDscript에서 둘 중 하나 또는 둘 모두를 정의하면 엔진이 자동으로 두 개의 메서드를 호출한다. 
- `_physics_process()` 는 초당 60회 고정속도로 호출됨 그리고 계속해서 캐릭터 물리적 상태를 업데이트한다


그런데 
```python
func _physics_process(delta):
	velocity.x = SPEED
	anim.play("Idle")

	if not is_on_floor(): # 공중이라
		velocity.y += gravity * delta
#
	## Handle jump.
	if Input.is_action_just_pressed("enter") and is_on_floor():		
		velocity.y = JUMP_VELOCITY	
		velocity.y = move_toward(velocity.y, SPEED, SPEED)
		anim.play("Jump") #### 이때는 아예 Jump애니메이션이 실행이 안된다 왜지?
```

Godot에서 `physics_process()`는 기본적으로 초당 60회 호출하는데 이게  점프 애니메이션이 실행되지 않는 문제의 원인이다


1. **상태 업데이트 빈도**: `velocity.y` 값을 변경한 직후에 바로 `anim.play("Jump")`를 호출하는데,  이 physics_process는  매 프레임마다 실행되고 있으니, 점프 애니메이션이 시작되기도 전에 캐릭터의 상태가 다시 바뀔 수 밖에 없다. 예를 들어, `is_on_floor()`가 다음 프레임에서 바로 `false`가 되어서 점프 애니메이션이 중단될 수 있습니다.
    
2. **애니메이션 우선순위**: Godot에서는 애니메이션이 중첩될 수 있으며, 이전에 실행된 애니메이션이 끝나기 전에 새 애니메이션이 실행되면, 이전 애니메이션이 중단될 수 있다. 만약 `anim.play("Jump")` 이전에 다른 애니메이션이 실행 중이고, 그 애니메이션이 아직 완료되지 않았다면, `Jump` 애니메이션은 시작되지 않을 수 있다.. 

그렇다고 physics_process()를 호출하지 않으면 상태가 업데이트 되지 않는다!  
그럼 어떻게 해결 할 수 있을까?





## 👯‍♂️ 해결 방법; State Machine

지피티한테 물어보니 state machine 디자인패턴을 추천했다..


```ad-important
title: state-machine
- SW 디자인패턴
- 게임 개발, 웹 서버, 네트워크 프로토콜, 비즈니스 프로세스 관리 등 다양한 분야에서 널리 사용되며, 복잡한 조건 로직을 명확하고 관리하기 쉬운 형태로 정리할 수 있게 해준다.
- 이 패턴은 객체의 상태를 명확하게 관리하고, 객체의 상태 변화에 따른 동작을 체계적으로 처리할 수 있도록 돕는다. state machine은 각 상태와 이 상태에서 가능한 이벤트(또는 행동), 그리고 이러한 이벤트에 의해 발생하는 상태 전환을 정의한다
- 게임에서는 .. 게임 캐릭터의 다양한 상태(예: 대기, 이동, 점프, 낙하 등)를 관리하고, 각 상태에 따른 행동을 정의하는 방식으로 이를 통해 캐릭터의 현재 상태를 명확히 파악하고, 상태에 따른 애니메이션을 적절하게 재생할 수 있다!!!!
```

그럼 State Machine를 사용하여 캐릭터의 상태(예: 바닥에 있음, 점프 중, 공중 등)를 관리하고, 각 상태에 맞는 애니메이션만을 재생하도록하자!!

개발 방법은 아래와 같다 

```
상태정의 -> 상태전환 로직구현 -> 상태별 행동정의 상태갱신
```

- <mark style="background: #ABF7F7A6;">상태 정의:</mark> 캐릭터의 가능한 모든 상태(예: 대기, 이동, 점프, 낙하)를 정의

- <mark style="background: #ABF7F7A6;">상태 전환 로직 구현:</mark>: 각 상태에서 다른 상태로 전환하는 조건을 구현. 예를 들어, '대기' 상태에서 '점프' 버튼을 누르면 '점프' 상태로 전환하고, '점프' 상태에서 캐릭터가 공중에 있으면 '낙하' 상태로 전환

- <mark style="background: #ABF7F7A6;">상태별 행동 정의:</mark>: 각 상태에 따른 캐릭터의 행동(애니메이션 재생, 속도 변경 등)을 정의 예를 들어, '점프' 상태일 때는 'Jump' 애니메이션을 재생하고, '낙하' 상태일 때는 'Fall' 애니메이션을 재생.

- <mark style="background: #ABF7F7A6;">상태 갱신:</mark>: 게임 루프 내에서 캐릭터의 상태를 지속적으로 갱신하고, 해당 상태에 맞는 행동을 실행한다. (physics_process()에서 위의 내용을 구현하면 될 것 같다)

```python
extends CharacterBody2D

enum {
	RUNNING,
	JUMPING,
	FALLING
}

var state = RUNNING	
const SPEED = 30
const JUMP_VELOCITY = -400.0
@onready var anim = get_node("AnimationPlayer")
# Get the gravity from the project settings to be synced with RigidBody nodes.
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")
	

func _physics_process(delta):
	velocity.x = SPEED
	state = RUNNING
	
	if not is_on_floor(): # 공중이라
		velocity.y += gravity * delta
		if velocity.y < 0:
			state = JUMPING
		else:
			state = FALLING 
#
	## Handle jump.
	if Input.is_action_just_pressed("enter") and is_on_floor():		
		velocity.y = JUMP_VELOCITY	
		velocity.y = move_toward(velocity.y, SPEED, SPEED)
		
	match state:
		RUNNING:
			anim.play("Idle")			
		JUMPING:
			anim.play("Jump")
		FALLING:
			anim.play("Fall")
											
	move_and_slide()
```


1. 상태정의 

```python
enum {
	RUNNING,
	JUMPING,
	FALLING
}
```


2. 상태전환 로직 구현 

- 액션 러닝 게임이므로 디폴트 상태는 RUNNING
- 만약 `velocity.y<0` 즉 상승 중이라면 JUMPING 상태
- 만약 `velocity.y>0` 즉 하강 중이라면 FALLING 상태

```python
.....
	state = RUNNING
	
	if not is_on_floor(): # 공중이라
		velocity.y += gravity * delta
		if velocity.y < 0:
			state = JUMPING
		else:
			state = FALLING
```

3. 상태별 행동 정의 & 4. 상태갱신

- 엔터를 눌렀고 캐릭터가 현재 바닥이라면 정의된 상태에 맞는 행동 정의
- 그리고 이러한 로직을 physics_process 함수 내에서 구현해 게임 루프내에서 실행될 수 있도록 한다 

```python
....
	if Input.is_action_just_pressed("enter") and is_on_floor():		
		velocity.y = JUMP_VELOCITY	
		velocity.y = move_toward(velocity.y, SPEED, SPEED)
		
	match state:
		RUNNING:
			anim.play("Idle")			
		JUMPING:
			anim.play("Jump")
		FALLING:
			anim.play("Fall")
```

성공!!

![](https://i.imgur.com/94zOvZ2.gif)


## 👯‍♂️ Ref & LINKS TO THIS PAGE

- [웹, godot 튜토리얼, physics_processing()과 process()](https://docs.godotengine.org/en/stable/tutorials/scripting/idle_and_physics_processing.html)
- [웹, reddit, jump and fall anim only play first frame](https://www.reddit.com/r/godot/comments/le9x2n/jump_and_fall_animations_only_play_first_frame/)
- [유튜브,  godot jump](https://youtu.be/IOe1aGY6hXA?feature=shared)


