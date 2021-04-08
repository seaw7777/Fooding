from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.core.files.storage import default_storage

from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from stores.serializers import StoreSerializer
from .serializers import FollowSerializer, UserSerializer, LikeSerializer
from .models import Follow, Like, User, Wish
from stores.models import Store
from recommend.models import reviewcategory
from server.settings import SECRET_KEY


import jwt
import datetime


# Create your views here.
# 회원가입
@api_view(['POST'])
def signup(request):
    try:
        if User.objects.filter(email=request.data.get('email')).exists():
            return Response({'message': '이미 존재하는 이메일입니다.'}, status=status.HTTP_400_BAD_REQUEST)

        User.objects.create(
            email=request.data.get('email'),
            nickname=request.data.get('nickname'),
            password=request.data.get('password'),
            address=request.data.get('address'),
            spoon_cnt=0,
        ).save()

        # 리뷰 카테고리 컬럼 생성
        userid = User.objects.get(email=request.data.get('email'))
        reviewcategory.objects.create(
            user_id=userid.id,
            krzzimandtang=0,
            krbbq=0,
            krgukbap=0,
            krstewandcasserole=0,
            krporkfeetandBossam=0,
            krseafood=0,
            krnoodles=0,
            krhomecooking=0,
            krchicken=0,
            krfood=0,
            bunsick=0,
            jpfriedfood=0,
            jpsashimi=0,
            jphomecooking=0,
            jpseafood=0,
            jpnoodles=0,
            jpfood=0,
            cddrink=0,
            cdcafe=0,
            cddessert=0,
            chnoodles=0,
            chfriedfood=0,
            chbbq=0,
            chfood=0,
            wenoodles=0,
            wepizza=0,
            wesalad=0,
            wefood=0,
            brbar=0,
            brjpanbar=0,
            bkbakery=0,
            fffood=0,
        ).save()

        # 카테고리 별 선호도 초기값 셋팅

        reviewdata = reviewcategory.objects.filter(user_id=userid.id).values()
        taste = request.data.get('taste')
        for i in taste:
            if(i == "한식"):
                reviewdata.update(
                    krzzimandtang=1,
                    krbbq=1,
                    krgukbap=1,
                    krstewandcasserole=1,
                    krporkfeetandBossam=1,
                    krseafood=1,
                    krnoodles=1,
                    krhomecooking=1,
                    krchicken=1,
                    krfood=1,
                )
            elif(i == "분식"):
                reviewdata.update(
                    bunsick=1,
                )
            elif(i == "일식"):
                reviewdata.update(
                    jpfriedfood=1,
                    jpsashimi=1,
                    jphomecooking=1,
                    jpseafood=1,
                    jpnoodles=1,
                    jpfood=1,
                )
            elif(i == "카페"):
                reviewdata.update(
                    cddrink=1,
                    cdcafe=1,
                    cddessert=1,
                )
            elif(i == "중식"):
                reviewdata.update(
                    chnoodles=1,
                    chfriedfood=1,
                    chbbq=1,
                    chfood=1,
                )
            elif(i == "양식"):
                reviewdata.update(
                    wenoodles=1,
                    wepizza=1,
                    wesalad=1,
                    wefood=1,
                )
            elif(i == "술집"):
                reviewdata.update(
                    brbar=1,
                    brjpanbar=1,
                )
            elif(i == "베이커리"):
                reviewdata.update(
                    bkbakery=1,
                )
            elif(i == "패스트푸드"):
                reviewdata.update(
                    fffood=1,
                )

        return Response({'success': 'success'}, status=status.HTTP_201_CREATED)

    except KeyError:
        return Response({'error': 'KeyError'}, status=status.HTTP_400_BAD_REQUEST)


# 로그인
@api_view(['POST'])
def login(request):
    if User.objects.filter(email=request.data.get('username')).exists():
        if User.objects.get(email=request.data.get('username')).password == request.data.get('password'):
            token = jwt.encode({
                'email': request.data.get('username'),
                'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=300),
                "iat": datetime.datetime.utcnow()
            },
                SECRET_KEY,
                algorithm="HS256"
            ).decode('UTF-8')

            user = User.objects.get(email=request.data.get('username'))

            return Response({'loginSuccess': True, 'id': user.id, 'email': request.data.get('username'), 'nickname': user.nickname, 'address': user.address, 'spoon_cnt': user.spoon_cnt, 'grade': user.grade, 'token': token}, status=status.HTTP_200_OK)

        else:
            return Response({'loginSuccess': False, 'message1': '입력된 이메일 혹은 비밀번호가 틀렸습니다'})

    else:
        return Response({'loginSuccess': False, 'message2': '존재하지 않는 이메일입니다'})


# 비밀번호 변경
@api_view(['POST'])
def change_pw(request):
    user = User.objects.get(email=request.data.get('username'))
    user.password = request.data.get('change_pw')
    user.save()

    return Response({'success': 'success'}, status=status.HTTP_202_ACCEPTED)

# 프로필 이미지 변경
@api_view(['POST'])
def change_image(request):
    id = request.data.get('user_id')
    # user = User.objects.get(id = id)
    file = request.FILES['file']
    file.name = str(id) + "_profile.png"
    if(default_storage.exists("user" + '/' + file.name)):
        default_storage.delete("user" + '/' + file.name)
    path = default_storage.save("user"+'/'+file.name, file)
    return Response(status=status.HTTP_200_OK)

# 주소지 변경
@api_view(['POST'])
def change_address(request):
    region_list = request.data.get('region_name')
    change_address_name = ""
    for i in region_list:
        change_address_name = change_address_name + i + " "
    user = User.objects.get(id=request.data.get('user_id'))

    user.address = change_address_name
    user.save()

    return Response({'success': 'success'}, status=status.HTTP_200_OK)

# 회원별 회원정보 불러오기
@api_view(['GET'])
def user_info(request, id):
    if User.objects.filter(id=id).exists():
        user = User.objects.get(id=id)

        serializer = UserSerializer(user)

        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


# 회원별 팔로워 불러오기
# 나를 팔로우 한사람 불러오기
@api_view(['GET'])
def follower_info(request, id):
    if User.objects.filter(id=id).exists():
        follower_id = Follow.objects.filter(follow_id=id)

        follower = []

        for f in follower_id:
            fw = User.objects.get(id=f.following_id)

            follower.append({
                "id": fw.id,
                "nickname": fw.nickname,
                "email": fw.email,
                "address": fw.address,
                "spoon_cnt": fw.spoon_cnt,
                "grade": fw.grade,
            })

        return JsonResponse(follower, safe=False, json_dumps_params={'ensure_ascii': False}, status=status.HTTP_200_OK)

    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


# 회원별 팔로잉 불러오기
# 내가 팔로우 한사람 불러우기
@api_view(['GET'])
def following_info(request, id):
    if User.objects.filter(id=id).exists():
        following_id = Follow.objects.filter(following_id=id)

        following = []

        for f in following_id:
            fw = User.objects.get(id=f.follow_id)

            following.append({
                "id": fw.id,
                "nickname": fw.nickname,
                "email": fw.email,
                "address": fw.address,
                "spoon_cnt": fw.spoon_cnt,
                "grade": fw.grade,
            })

        return JsonResponse(following, safe=False, json_dumps_params={'ensure_ascii': False}, status=status.HTTP_200_OK)

    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


# 회원별 좋아요(가게) 불러오기
@api_view(['GET'])
def like_info(request, id):
    if User.objects.filter(id=id).exists():
        like = Like.objects.filter(user_id=id)

        serializer = LikeSerializer(like, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)

    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)

# 팔로우하기


@api_view(['GET'])
def make_follower(request, user_id, follower_id):
    if User.objects.filter(id=user_id).exists():
        Follow.objects.create(
            follow_id=follower_id,
            following_id=user_id
        ).save()
        return Response({'message': '완료'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)
# 언팔로우하기


@api_view(['GET'])
def delete_follower(request, user_id, follower_id):
    if User.objects.filter(id=user_id).exists():
        Follow.objects.filter(follow_id=follower_id,
                              following_id=user_id).delete()
        return Response({'message': '완료'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


# 팔로우 체크
@api_view(['GET'])
def check_follow(request, user_id, follower_id):
    if User.objects.filter(id=user_id).exists():
        if Follow.objects.filter(follow_id=follower_id, following_id=user_id).exists():
            return Response({'message': '완료'}, status.HTTP_200_OK)
        else:
            return Response({'message': '팔로우 되어 있지 않습니다.'}, status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'message': '회원정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)


# 찜 하기
@api_view(['GET'])
def make_wish(request, user_id, store_id):
    if Wish.objects.filter(user_id=user_id, store_id=store_id).exists():
        return Response({'message': '이미 등록 된 가게입니다.'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        Wish.objects.create(
            user_id=user_id,
            store_id=store_id,
        ).save()
        return Response({'message': '완료'}, status=status.HTTP_200_OK)


# 찜 취소
@api_view(['GET'])
def delete_wish(request, user_id, store_id):
    if Wish.objects.filter(user_id=user_id, store_id=store_id).exists():
        Wish.objects.filter(store_id=store_id, user_id=user_id).delete()
        return Response({'message': '완료'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': '찜 정보가 존재하지 않습니다'}, status=status.HTTP_400_BAD_REQUEST)

# 찜한 가게 불러오기


@api_view(['GET'])
def select_wish(request, user_id):
    if User.objects.filter(id=user_id).exists():
        store = []
        store_id_list = Wish.objects.filter(user_id=user_id)
        dummy = []

        for i in store_id_list:
            du = Store.objects.get(id=i.store_id)
            store.append({
                "id": du.id,
                "store_name": du.store_name,
                "area": du.area,
                "tel": du.tel,
                "address": du.address,
                "lat": du.lat,
                "lng": du.lng,
                "main_category": du.main_category,
                "middle_category": du.middle_category,
                "review_cnt": du.review_cnt,
                "star": du.star,
                "pet": du.pet,
                "children": du.children,
                "parent": du.parent,
                "friend": du.friend
            })

        return JsonResponse(store, safe=False, json_dumps_params={'ensure_ascii': False}, status=status.HTTP_200_OK)
    else:
        return Response({'message': '잘못된 계정 접근 입니다.'}, status=status.HTTP_400_BAD_REQUEST)
